import requests
import os
import base64

url = 'http://localhost:5000/api/v0/file/'
s = requests.Session()

while 1:
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
    print(a)

    res = s.post(url=url, headers=headers, json=a, allow_redirects=True)

    print(res.text)

