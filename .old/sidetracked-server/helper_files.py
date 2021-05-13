# what is the purpose of this file?
## this file has all the extra code belonging the filesystem
# why?
## the api.py file was getting out of hand and i think this will make it work a lot smoother
import os
import base64
from binaryornot.check import is_binary

#local
from sidetrack_logger import logger as log

# this is so we dont have to type out the long syntax for base64
def encode(a):
    return base64.b64encode(a.encode('utf-8')).decode('utf-8')
def decode(a):
    return base64.b64decode(a.encode('utf-8')).decode('utf-8')



def ls(path):
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




# check weather a file exists and is of the right type
def verify_file(expected_type='', filepath=''):
    # empty == any file but not folder
    if expected_type == '':
        # isfiel checks both the existance of the file and weather or not its a file
        if os.path.isfile(filepath):
            return True
        else:
            return False

    elif expected_type == 'file/text':
        # isfiel checks both the existance of the file and weather or not its a file
        if os.path.isfile(filepath):
            # NOTE this may not be correct im not sure
            # if file isnt binary then it is text
            if not is_binary(filepath):
                return True
        return False

    elif expected_type == 'file/binary':
        # isfiel checks both the existance of the file and weather or not its a file
        if os.path.isfile(filepath):
            # check if file is binary
            if is_binary(filepath):
                return True
        return False

    elif expected_type == 'folder':
        # isfiel checks both the existance of the file and weather or not its a file
        if os.path.isdir(filepath):
            return True
        return False

    else:
        raise Exception("unknown expected_type in files.verify_file]") 



def readfile(filepath):
    log(level='log', msg=f'reading file:  {filepath}')

    try: # attempt to read the file
        with open(filepath, 'rb')as infile:
            data = infile.read()
    except:
        # this should not happen, but im sure there is some way it occurs
        log(level='error', msg=f'an error occured while reading file:  {filepath}')
        return False


    # dont alert client just warn for 0 length file
        # honestly not sure if we need this but seemed smart
    if len(data) == 0:
     log(level='warning', msg=f"file: {filepath} has length of 0")


    try: # attempt to encode data
        data = base64.b64encode(data).decode('utf-8')
    except: # failed to encode data
        log(level='error', msg=f"file data malformed [{filepath}]")
        return False

    return data


def write_file(filepath, data):
    log(level='log', msg='writing file: {filepath} to server')

    filepath = filepath.replace('..', '')

    # get the path of the folder containing this file
    folder_path = '/'.join(filepath.split('/')[:-1])
    if len(folder_path) == 0:
        folder_path = '/'


    if not os.path.isdir(folder_path):
        # NOTE this might be a bad decision, but im opting to create non existent filepaths if possible
        log(level='warning', msg='creating non existant folderstructure for save file')
        try:
            os.makedirs(folder_path)
        except:
            log(level='error', msg='folder structure creation failed')
            return False


    try:
        # write file to server, base64.b64decode returns binary so no need to convert
        with open(filepath, 'wb+')as outfile:
            outfile.write(data)
    except:
        # this will probably occur if the path to file does not exist, 
        # TODO write a seperate check for this
        log(level='log', msg=f"failed to write file to server, perhaps this path does not exist {filepath}")
        return False


    # operation successful
    return True


