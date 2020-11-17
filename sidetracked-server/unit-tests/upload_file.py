import requests


url = 'http://localhost:5000/'
s = requests.Session()

while True:
    filename = input('>> ')
    # only so i dont have to write a filename while debugging
    if len(filename) == 0:
        filename = "fuckthis.txt"

    with open(filename, 'r')as infile:
        data = infile.read()

    a = {
            'file':filename,
            'data': data
            }

    res = s.post(url=url+'/api/v0/file/', json=a)

    print(res.text)
