import requests
import os
import base64

s = requests.Session()


def sendls(s):

    url = 'http://localhost:5000/api/v0/ls/'

    headers={
            "content-type":"application/json",
            "dir_name": input('>> ')
            }
    res = s.get(url=url, headers=headers)

    return res.text



def sendfile(s):
    url = 'http://localhost:5000/api/v0/file/'

    filename = input('>> ')
    if len(filename) == 0:
        filename = 'testfile'

    with open(filename, 'rb+')as infile:
        data = infile.read()

    data = base64.b64encode(data).decode('utf-8')

    headers={
            "content-type":"application/json",
            }
    a = {
            'file': filename,
            'data': data
            }

    res = s.post(url=url, headers=headers, json=a, allow_redirects=True)

    return res.text


def getfile(s):
    url = 'http://localhost:5000/api/v0/file/'

    filename = input('>> ')
    if len(filename) == 0:
        filename = 'testfile'

    headers={
            "content-type":"application/json",
            'file': filename
            }

    res = s.get(url=url, headers=headers,  allow_redirects=True)

    return res.text


while 1:
    reqtype = input('type: ')
    if reqtype == 'ls':
        print(sendls(s))
    elif reqtype == 'send':
        print(sendfile(s))
    elif reqtype == 'get':
        print(getfile(s))

