import requests
import time
import os
import base64

s = requests.Session()

def b(a):
    return base64.b64encode(a.encode('utf-8')).decode('utf-8')

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

def heartbeat(s):
    url = 'http://localhost:5000/api/v0/heartbeat/'
    a = {
            "file": 'testfile',
            "time": time.time(),
            "delta": [
                    {
                     "line_num": 23,
                     "text": b("Damn that's interesting! Really, really interesting. Like, it has a lot of interesting stuff in it. Even cloning dinosaurs or time travel would be less interesting. Because that was the most interesting thing i've ever heard. Man, i really can't believe how interesting it is. But... there is only one problem, just one little, small, microscopic problem that you probably didn't think about. And that is, the fact that literally no body asked for you to say that. I searched the entirety of Europe, America, Asia and Oceania. But sadly, no one has asked.")
                    },
                    {
                     "line_num": 27,
                     "text": b("What do you have, are you younger? I know you are completing my share of AP calculation and I participated in al-husband with a lot of secret invasions, and I solved more than 300 phrases. I have trained in maths and was the main multiplied club of the school after school. You have nothing to me but another math question. I accidentally greet the mistakes with a mistake I have never seen before and I will mention my kind words. Do you think you can avoid seeing your job through the Internet? Thinking back and it's delicious. When we say we are facing a US backgammon secret network, your school identification should now be a balloon to prepare storms. Arashi will be unhappy calling zero. You have died, the boy. I can always kill you in more than 700 ways or anywhere, and that's my pencil. I'm not only trained at a long part that can access the entire arsenal of the Texas device, but it uses its entire level to delete the buttocks worn from the continent, you will try to beat you, you will go to school. That's good, but you don't, and now it's the hell journey there will be. You are all, you will break them into them. You die, children.")
                    }
                ]
            }

    res = s.post(url=url, json=a, allow_redirects=True)


    return res.text


while 1:
    reqtype = input('type: ')
    if reqtype == 'ls':
        print(sendls(s))
    elif reqtype == 'send':
        print(sendfile(s))
    elif reqtype == 'get':
        print(getfile(s))
    else:
        print(heartbeat(s))

