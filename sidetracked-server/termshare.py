import os, subprocess, sys, socket, json

# fake terminal, reads input, execs using subprocess and sends output to socket
# client side

class FakeTerm:
    def __init__(self,id=0,dest='127.0.0.1',rport=9000):
        self.id = id
        self.dest = dest
        self.rport = rport

    def fakeshell(self):
        inp = ''
        capture = {'command':None,'output':None}
        while(inp != 'quit'):
            inp = input('$ ')
            if (inp == 'quit'):
                break
            capture['command'] = inp
            try:
                proc = subprocess.run(inp.split(' '),capture_output=True)
                output = proc.stdout.decode()
                capture['output'] = output
                print(output)
            except:
                output = 'bad command'
                capture['output'] = output
                print(output)
            finally:
                try:
                    sock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
                    sock.connect((self.dest,self.rport))
                    sock.send(json.dumps(capture).encode())
                    sock.close()
                except Exception as e:
                    print('data not sent to server, error: {}'.format(e))
                finally:
                    capture = {'command':None,'output':None}

# server side                    
class TermShare:
    def __init__(self,lport=9000):
        self.lport = lport
        self.sock = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
        self.sock.bind(('127.0.0.1',self.lport))

    def listen(self):
        self.sock.listen()
        con,addr = self.sock.accept()
        while True:
            data = con.recv(10240)
            if not data:
                break
            print(str(addr))
            try:
                data_recv = json.loads(data.decode())
                print(data_recv)
            except:
                print('bad json')

    def listen_loop(self):
        while True:
            self.listen()
