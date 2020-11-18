import requests

url = 'http://localhost:5000/api/v0/ls'
s = requests.Session()

while 1:

    headers={
            "content-type":"application/json",
            "dir_name": input('>> ')
            }
    res = s.get(url=url, headers=headers)

    print(res.text)

