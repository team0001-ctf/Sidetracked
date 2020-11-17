from flask import jsonify, json
from sidetrack_logger import logger as log
# import base64 # uncomment if we want to compress our data
# import zlib # uncomment if we want to compress our data

# Exmaple json sent from client
#{
#    "file": "/notes/testNote.md",
#    "data": "Here is the file2"
#}
def upload_files(json_data):
    # open file with write perms
    # TODO: fix path traversal bug here
    f = open("root" + json_data["file"], "w+")
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



def list_files(json_data):
    # stuff sent from client:
    # {
    #   file_editing: "balh",
    #   cursor_loc, [0,1]
    # }
    # response:
    # {
    #    file: "balh",
    #    modified: true,
    #    data: "xyz",
    #    users: [
    #         "person1": [1, 2],
    #         "person2": [3, 2] 
    #        ] 
    # }

    # hearbeats from single user
    cursor_loc = json_data['cursor_loc']
    file_editing = json_data['file_editing']

    # TODO add redis server stuff

    return 200

# should file deltas be in the heartbeat?
def hearbeat(json_data):
    # do the things needed
    return 200
