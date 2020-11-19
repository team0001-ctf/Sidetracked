from flask import jsonify, json
from sidetrack_logger import logger as log
import os
import base64
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
    # write the data sent to the file. @
    # @NOTE: We will want this to write the delta ast some point
    #        but for now we can just write the whole file.

    try:
        # attempt to format data gotten from client
        filepath = json_data['file']
        data = json_data['data']
        data = base64.b64decode(data)
        filepath = f'root/{filepath}'.replace('..', '')
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
def download_files(json_data):
    try:
        # attempt to get requested file from client
        filepath = 'root/'+json_data['file']
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
    # @NOTE this is probably still vulnerable to path traversal and should be implemented properly
    path = header_data['dir_name']
    # Set up the full path of where to `ls`
    path = f'root/{path}'
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
    # do the things needed
    return 200
