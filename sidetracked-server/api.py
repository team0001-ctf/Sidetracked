from flask import jsonify, json
from sidetrack_logger import logger as log
import os
# import base64 # uncomment if we want to compress our data
# import zlib # uncomment if we want to compress our data

# Exmaple json sent from client
#{
#    "file": "/notes/testNote.md",
#    "data": "Here is the file2"
#}
def upload_files(json_data):
    # open file with write perms
    f = open("root" + json_data["file"], "w")
    # write the data sent to the file. @
    # @NOTE: We will want this to write the delta ast some point
    #        but for now we can just write the whole file.
    f.write(json_data["data"])
    return 200

# Exmaple json sent from client
#{
#    "file": "/notes/testNote.md",
#}
def download_files(json_data):
    # In a try-except block because the file might not exsit.
    try:
        # open files for reading
        f = open("root" + json_data["file"], "r")
    except IOError:
        log(level='error', msg='no file')
        return 300

    # read data into an object to send back to client
    # @note: This can be a hard reset on a file just incase something
    #        goes really bad on the client side with the state of a shared
    #        file.
    r = f.read()
    # close the file
    f.close()
    # @TODO We should look into compressing the data before sending it.
    # r_compressed = base64.b64encode(zlib.compress(r.encode('ascii')))
    # jsonify our response with the content of the file and the filename.
    r_json = jsonify(file=json_data["file"], data=str(r))
    return r_json

# Exmaple json sent from client
# HEADER: { dir_name: "/" }
def list_files(header_data):
    # @NOTE this is probably still vulnerable to path traversal and should be implemented properly
    path = header_data['dir_name']
    # Set up the full path of where to `ls`
    path = f'root{path}'
    # Client should never .. , so lets just remove it
    path = path.replace('/..','')

    log(level='log', msg=f'accessing fies root{header_data["dir_name"]}')

    # Get the list of files in the dir
    files = os.listdir(path)

    # Set up json object that will be returned
    files_obj = {
            "files": []
            }

    # Go through each file that was returned in our "listdir" command.
    # This will figure out if it is a file or a directory.
    for item in files:
        if os.path.isdir(path + item):
            file_type = 'folder'
        elif os.path.isfile(path + item):
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
    # do the things needed
    return 200
