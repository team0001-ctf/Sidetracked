# what is the purpose of this file?
## this file has all the extra code belonging to delta files
# why?
## the api.py file was getting out of hand and i think this will make it work a lot smoother
import os
import base64

from sidetrack_logger import logger as log


def encode(a):
    return base64.b64encode(a.encode('utf-8')).decode('utf-8')
def decode(a):
    return base64.b64decode(a.encode('utf-8')).decode('utf-8')


# NOTE this cannot be run multiple times at once
# this function should only be called internally by the server, the client changes should be stored in redis
def edit_textfile(delta, filename):
    try: # attempt to read file
        with open(filename, 'r')as infile:
            filedata = infile.read()
        filedata = filedata.split('\n')
    except: # fail
        log(level='error', msg='could not open file to wirte delta')
        return False

    # write changes to files
    for change in delta:

        try: # if the data does not exist then this should fail
            # converting is a quick and dirty way of checking if they are valid
            line_num = int(change['line_num'])
            changed_line = str(decode(change['text']))
        except: 
            log(level='warning', msg=f'element {change} in delta list is invalid and WILL BE IGNORED! \nmake sure line_num is int AND changed_line is encoded')
            return False


        # modify each line that needs to be modified
        for i, line in enumerate(filedata):
            if i+1 == line_num: # in files we usually start at line 1
                # im not using append bc that messes up when there are multiple changes
                filedata[i] = changed_line
            else:
                filedata[i] = line

    # write all new lines
    for change in delta:
        try: # if the data does not exist then this should fail
            # converting is a quick and dirty way of checking if they are valid
            line_num = int(change['line_num'])
            changed_line = str(decode(change['text']))
        except: 
            log(level='error', msg='element {change} in delta list is invalid')
            return False

        # write new lines
        ## will not write new lines between the changed line and the already existing file!
        ### reason: leaving a new line is a change and should be sent by the client
        if line_num > len(filedata):
            filedata.append(changed_line)

    try: # attempt to write
        with open(filename, 'w')as outfile:
            outfile.write('\n'.join(filedata))
    except: #fail
        log(level='error', msg="failed to write file delta {filename}")
        return False

    # everything worked fine
    return True



def read_changes(filename):
    #NOTE this is not final
    ## currently this function sends the entire file in the format i will later only send a delta
    ## later it will only send the things changed by other users

    try: # attempt to read the file
        with open(filename, 'r')as infile:
            filedata = infile.read()
        filedata = filedata.split('\n')
    except: # fail
        log(level='error', msg="could not read file in function read_changes")
        return False


    # this is the data objec that will be returned
    return_data = {
                "delta": []
            }

    # append all lines in the file to the delta
    for i, line in enumerate(filedata):
        # each change gets appended to the 'delta' list
        change = {
                "line_num": i+1, # in files we usually start at line 1
                "text": encode(line)
                }
        return_data['delta'].append(change)


    # r e t u r n
    return return_data





def write_changes(delta, filename):
    # NOTE this is not how this should be used, bc multiple requests at once would overwrite each others work
    ## this function will store changes in redis, then a seperate event will write the file from redis into where its supposed to go
    edit_textfile(delta, filename)
    return True

