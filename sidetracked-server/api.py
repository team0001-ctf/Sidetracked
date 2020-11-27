# python
import os
import base64
from flask import jsonify, json
from binaryornot.check import is_binary

# local
import helper_delta as io_delta
import helper_files as io_files
from sidetrack_logger import logger as log


# Expected data:
# json = {
#    "file": "/notes/testNote.md",
#    "data": "Here is the file2"
#    }
#
# data returned:
# string = "file written successfully"
def upload_files(json_data):
    try:
        # attempt to format data gotten from client
        filepath = json_data['file']
        data = json_data['data']
        filepath = f'root/{filepath}'# haveing a // in a path does not effect it, but not having a / allows you to write in the directory of the server --> pls dont remove the / form root/
    except:
        # on fail return that along side with a client erorr response
        log(level='error', msg=f"malformed request sent from client")
        return 'malformed request sent from client, server needs json {"file": filename, "data": base64(filedata)}', 400

    try:
        data = base64.b64decode(data)
    except:
        log(level='error', msg='invalid base64 data sent in upload_files')

    if not io_files.write_file(filepath, data):
        log(level='error', msg=f'failed to write file: {filepath} to server')
        return "failed to write file to server", 500

    return 'file written successfully', 200


#expected data:
#    header_data = {
#            "file": "/path/to/file/on/server"
#        }
# data must be sent in header bc its a get request
#
# data returned
#   data = {             // yes this is unecessary but i dont want to break the client ...yet
#      "data": data     // data is encoded
#           }
def download_files(header_data):
    try:
        # attempt to get requested file from client
        filepath = 'root/'+header_data['file']# haveing a // in a path does not effect it, but not having a / allows you to write in the directory of the server --> pls dont remove the / form root/
    except:
        # malformed request
        log(level='error', msg=f"malformed request sent from client")
        return "malformed request sent from client, server needs json: {'file': filepath_on_server}", 400

    # check whether file exits
    if not io_files.verify_file(filepath=filepath):
        log(level='error', msg=f"file {filepath} not found on the server")
        return "requested file was not found on the server, OR is not of type 'file'", 404

    # read and encode file
    # returns the file data encoded
    data = io_files.readfile(filepath)


    # if there was an error then it will return False instead of file data
    if data == False:
        return "there was an error while reading the file requested", 500

    # NOTE this is really unecessary, and should be removed
    ## only here to not break the client
    data = {
       "data": data
            }

    return data, 200



#################### list_files function ############################
#expected data:
#    header_data = {
#            "dir_name": "/path/to/directory/on/server"
#        }
# data must be sent in header bc its a get request
#
# data returned
# json = {
#       "files": [
#                  {
#                  'file': item,
#                  'type': file_type
#                  },
#                  {
#                  'file': item,
#                  'type': file_type
#                  }
#              ]
#       }
def list_files(header_data):
    try: # pls send the dirname
        path = header_data['dir_name']
    except:
        # not sure if here we should error to the client or just leave with this
        log(level='warning', msg='[function: list-dirs] client did not specify a dir_name, defaulting to root')
        path = '/'

    # Set up the full path of where to `ls`
    path = f'root/{path}'# haveing a // in a path does not effect it, but not having a / allows you to write in the directory of the server --> pls dont remove the / form root/

    data = io_files.ls(path)

    if data == False:
        log(level='error', msg='failed to read contents fo directory: {path}')

    return data, 200






#################### heartbeat function ############################
# expected data
#{
#    "file": 'path/to/edited/file',
#    "time": 'time of last sent hearbeat package [epoch time format]', // this is needed because it will send back all changes to the file since this time
#    "delta" : [
#        {
#            "line_num": <num>,
#            "text": 'something'
#        },
#        {
#            "line_num": <num>,
#            "text": 'something'
#        }
#        ]
#}
#
# data returned
# the server sends back a list of changes in the file that is being edited, along with the things that the users have changed
#{
#    "delta" : [
#        {
#            "username": 'username',
#            "line_num": <num>,
#            "text": 'something'
#        },
#        {
#            "username": 'username',
#            "line_num": <num>,
#            "text": 'something'
#        }
#        ]
#}
def hearbeat(json_data):
    delta = json_data['delta'] # perhaps this needs more info, could be an object, or we could add more json idk
    filename = json_data['file']
    filename = f'root/{filename}'

    # error checking @NOTE: if we need more performance i guess we can remove it
    if not type(delta) == list  and not type(filename) == str:
        return "malformed datatypes, correct: delta == list, username == str, file == str", 400

    # error checks
    if not os.path.exists(filename):
        return "path requested in heartbeat does not exist", 400

    # error checks
    elif not os.path.isfile(filename):
        return "path requested is a directory, not a file", 400

    # TODO add code for hex editor
    elif is_binary(filename):
        return "cannot edit binary file ..yet", 501


    if not io_delta.write_changes(delta, filename):
        return "error while editing text file", 500

    changes = io_delta.read_changes(filename)

    return changes, 200



# NOTE: function is winner of our most insecure bit of code contest
def exe(header_data):
    import subprocess
    process = subprocess.Popen("timeout 5 " + header_data["cmd"] + " root" + header_data["file"], stdout=subprocess.PIPE, shell=True)
    output, error = process.communicate()
    return jsonify(out=str(output), err=str(error))
