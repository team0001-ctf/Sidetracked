server specification stuff
==========================

# files

## upload
client sends a file to the server

## download
server sends a file to the client

## ls
get list of files on the server
- this way we can have a sort of file browser locally


# hearbeat
sent from the client to the server
#### request
send changed delta of the file

#### response
- get what other ppl have changed




# auth
need to add a second database, probably sqlite for the authentication
















# small reqwrite


### things that will break
when downloading files to the server the server responded with 
```json
{
    "data": data
}
```
i didnt see the point of this so i removed it, this can be bought back easy enough
- its just commented out in api.py

