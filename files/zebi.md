# documentation of the api in its current state





uplaoding a file:
-----------------
### endpoint:
* POST `http://server.com/api/file/<filename>`
`replace <filename> with the name of the file`


The file has to be sent in json in base64 encoded form. This way all files can be sent, including binary

<br />

Json data to send to the server:

```json
{
    "data": 
"QmVlIE1vdmllIFNjcmlwdCAtIERpYWxvZ3VlIFRyYW5zY3JpcHQKCiAgCkFjY29yZGluZyB0byBhbGwga25vd24gbGF3cwpvZiBhdmlhdGlvbiwKCiAgCnRoZXJlIGlzIG5vIHdheSBhIGJlZQpzaG91bGQgYmUgYWJsZSB0byBmbHkuCgogIApJdHMgd2luZ3MgYXJlIHRvbyBzbWFsbCB0byBnZXQKaXRzIGZhdCBsaXR0bGUgYm9keSBvZmYgdGhlIGdyb3VuZC4KCiAgClRoZSBiZWUsIG9mIGNvdXJzZSwgZmxpZXMgYW55d2F5CgogIApiZ"
}
```

The method will return the path at witch you can get the uplaoded file. This path will be sanitized on the server to avoid rce.

### example code:
```py
filename = "notes.md"
url = "http://server.com/api/files/" + filename

filedata = base64.b64encode(open(filename, 'rb').read()).decode('utf-8')

json_data = {
    "data": filedata
}

res = requests.post(url=url, json=json_data)
print(res.json())
```


### example return:
```json
{
    "path": "/file/notes.md"
}
```


<br />
<br />
<br />
<br />

downloading a file
------------------
### endpoint:
* POST `http://server.com/api/file/<filename>`
`replace <filename> with the name of the file`

Sending a GET request to this method downloads the entire file.

### example code:
```py
filename = "notes.md"
url = "http://server.com/files/" + filename

res = requests.get(url=url)
```

### alternative single command
```
wget http://server.com/api/files/notes.md
```

<br />
<br />
<br />
<br />

getting a hash of the file
--------------------------

### endpoint:
* POST `http://server.com/api/hash/<filename>`
`replace <filename> with the name of the file`

This method returns an md5sum of the file. It can be used to monitor the file for changes.
<br />

For example you can have a worker that sends a get request to `/api/hash/` every second, and if the hash changes it gets the new file via [downloading a file](#dowloading-a-file)

The method should return the hash in json form.

### example code:
```py
filename = 'notes.md'
url = "http://server.com/api/files/" + filename

response = requests.get(url=url)
print(response.json())
```

### example return:
```json
{
    "hash": "9e7bcc8cc406fd16ba0099e86358db06"
}
```

<br />
<br />
<br />
<br />


updating a file
---------------
### endpoint:
* POST `http://server.com/api/update/<filename>`
`replace <filename> with the name of the file`



There are 2 methods of updating a file.


1. You can overwrite the entire file with the `upload file` method
2. You can send json with just the changed lines

This next bit will explain the json method:
<br />

The json method lets you replace one or more lines in the file.


## example json:
```json
{
    "changes": [
        {
            "line": 2,
            "data": "this is the new line"
        },
        {
            "line": 4,
            "data": "another new line"
        }]
}
```



listing available files
-----------------------
### endpoint:
* POST `http://server.com/api/ls`


Send a GET request to `/api/ls`


### example return
```json
{
    "files": [
        "a.md",
        "notes.md",
        "README.md",
        "readme.md",
        "notes1.md"
    ]
}
```



getting other file
------------------
You can download any file in the static directory by sending GET request to `/<filename>`
