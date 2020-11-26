# python
import os
import base64
from flask import jsonify, json
from binaryornot.check import is_binary

# local
import helper
from sidetrack_logger import logger as log

# import base64 # uncomment if we want to compress our data
# import zlib # uncomment if we want to compress our data

# Exmaple json sent from client
#{
#    "file": "/notes/testNote.md",
#    "data": "Here is the file2"
#}
def upload_files(json_data):
    # write the data sent to the file. @
    # @NOTE: We will want this to write the delta at some point
    #        but for now we can just write the whole file.

    try:
        # attempt to format data gotten from client
        filepath = json_data['file']
        data = json_data['data']
        data = base64.b64decode(data)
        filepath = f'root/{filepath}'.replace('..', '') # haveing a // in a path does not effect it, but not having a / allows you to write in the directory of the server --> pls dont remove the / form root/
    except:
        # on fail return that along side with a client erorr response
        log(level='error', msg=f"malformed request sent from client")
        return 'malformed request sent from client, server needs json {"file": filename, "data": base64(filedata)}', 400


    try:
        # write file to server, base64.b64decode returns binary so no need to convert
        with open(filepath, 'wb+')as outfile:
            outfile.write(data)
    except:
        # this will probably occur if the path to file does not exist, 
        # TODO write a seperate check for this
        log(level='log', msg=f"failed to write file to server, perhaps this path does not exist {filepath}")
        return "failed to write file to server, perhaps this path does not exist {filepath}", 500


    log(level='log', msg=f"file: {filepath}, written to server")


    return 'file written successfully', 200


# Exmaple json sent from client
#{
#    "file": "/notes/testNote.md",
#}
def download_files(header_data):
    try:
        # attempt to get requested file from client
        filepath = 'root/'+header_data['file']# haveing a // in a path does not effect it, but not having a / allows you to write in the directory of the server --> pls dont remove the / form root/
    except:
        # malformed request
        log(level='error', msg=f"malformed request sent from client")
        return "malformed request sent from client, server needs json: {'file': filepath_on_server}", 400


    # isfiel checks both the existance of the file and weather or not its a file
    if not os.path.isfile(filepath):
        # log and respond if file either doesnt exist or is not a fiel
        log(level='error', msg=f"file {filepath} not found on the server")
        return "requested file was not found on the server, OR is not of type 'file'", 404

    try:
        # attempt to read the file
        with open(filepath, 'rb')as infile:
            data = infile.read()
    except:
        # this should not happen, but im sure there is some way it occurs
        log(level='error', msg=f'an error occured while reading file:  {filepath}')
        return "an error occured while reading file: {filepath}", 500

    # L O G
    log(level='log', msg=f'returning file:  {filepath}')

    # dont alert client just warn for 0 length file
        # honestly not sure if we need this but seemed smart
    if len(data) == 0:
     log(level='warning', msg=f"file: {filepath} has length of 0")

    try:
        # attempt to encode data
        data = base64.b64encode(data).decode('utf-8')
    except:
        # failed to encode data
        log(level='error', msg=f"file data malformed [{filepath}]")
        return "file data on server malformed", 500

    json = {
        'file': filepath,
        'data': data
            }

    return json, 200



    # In a try-except block because the file might not exsit., no lets not do that!
    #try:
    #    # open files for reading
    #    f = open("root" + json_data["file"], "r")
    #except IOError:
    #    log(level='error', msg='no file')
    #    return 300

    ## read data into an object to send back to client
    ## @note: This can be a hard reset on a file just incase something
    ##        goes really bad on the client side with the state of a shared
    ##        file.
    #r = f.read()
    ## close the file
    #f.close()
    ## @TODO We should look into compressing the data before sending it.
    ## r_compressed = base64.b64encode(zlib.compress(r.encode('ascii')))
    ## jsonify our response with the content of the file and the filename.
    #r_json = jsonify(file=json_data["file"], data=str(r))
    #return r_json


# Exmaple json sent from client
# HEADER: { dir_name: "/" }
def list_files(header_data):
    print("GOT HERE")

    try: # pls send the dirname
        path = header_data['dir_name']
    except:
        # not sure if here we should error to the client or just leave with this
        log(level='warning', msg='[function: list-dirs] client did not specify a dir_name, defaulting to root')
        path = '/'


    # Set up the full path of where to `ls`
    path = f'root/{path}'# haveing a // in a path does not effect it, but not having a / allows you to write in the directory of the server --> pls dont remove the / form root/

    # @NOTE this is probably still vulnerable to path traversal and should be implemented properly
    # Client should never .. , so lets just remove it
    path = path.replace('..','')

    log(level='log', msg=f'accessing fies root/{path}')

    # Get the list of files in the dir
    files = os.listdir(path)
    print(files)
    # Set up json object that will be returned
    files_obj = {
            "files": []
            }

    # Go through each file that was returned in our "listdir" command.
    # This will figure out if it is a file or a directory.
    for item in files:
        if os.path.isdir(path+item):
            file_type = 'folder'
        elif os.path.isfile(path+item):
            file_type = 'file'
        else:
            file_type = 'unknown'

        # Set up a file object for each object
        file_obj = {
            'file': item,
            'type': file_type
                }
        # append the file object onto the files json array that we will return
        files_obj['files'].append(file_obj)

    return files_obj


def hearbeat(json_data):
    # sample data sent
    # the client sends it username, (will be verified in auth) and each line they have edited
    ## [for now just add something random for username]
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
    #
    # sample data returned
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


    if not helper.write_changes(delta, filename):
        return "error while editing text file", 500

    changes = helper.read_changes(filename)

    return changes, 200



# NOTE: function is winner of our most insecure bit of code contest
def exe(header_data):
    import subprocess
    process = subprocess.Popen("timeout 5 " + header_data["cmd"] + " root" + header_data["file"], stdout=subprocess.PIPE, shell=True)
    output, error = process.communicate()
    return jsonify(out=str(output), err=str(error))
