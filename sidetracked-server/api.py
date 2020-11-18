from flask import jsonify, json
from sidetrack_logger import logger as log
import os
import base64
# import base64 # uncomment if we want to compress our data
# import zlib # uncomment if we want to compress our data

# Exmaple json sent from client
#{
#    "file": "/notes/testNote.md",
#    "data": "Here is the file2"
#}
def upload_files(json_data):

    filepath = json_data['file']
    filepath = f'root/{filepath}'.replace('..', '')

    data = json_data['data']
    data = base64.b64decode(data)

    log(level='log', msg=f"writing file {filepath}")

    with open(filepath, 'wb+')as outfile:
        outfile.write(data)

    # write the data sent to the file. @
    # @NOTE: We will want this to write the delta ast some point
    #        but for now we can just write the whole file.
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
# {
#     "dir_name": "/"
# }
def list_files(header_data):
    #"files": [{
    #    "file": "1.md",
    #    "type": "/text/markdown"
    #}, {
    #    "file": "2.md",
    #    "type": "/text/markdown"
    #}, {
    #    "file": "3.md",
    #    "type": "/text/markdown"
    #}]

    # @NOTE this is probably still vulnerable to path traversal and should be implemented properly
    path = header_data['dir_name']
    path = f'root/{path}'
    path = path.replace('..','')



    log(level='log', msg=f'accessing fies root/{header_data["dir_name"]}')


    files = os.listdir(path)


    files_obj = {
            "files": []
            }

    for item in files:
        if os.path.isdir(path+item):
            file_type = 'folder'
        elif os.path.isfile(path+item):
            file_type = 'file'
        else:
            file_type = 'whatthefuck'

        a = {
            "file": item,
            'type': file_type
                }

        files_obj['files'].append(a)

    return files_obj

def hearbeat(json_data):
    # do the things needed
    return 200
