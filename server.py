#!/usr/bin/env python3
import os
import sys
import time
import base64
import string
import hashlib
import requests
import fileinput

from flask import Flask
from flask import request
from flask import send_file
from flask import make_response

from flask_restful import Api
from flask_restful import Resource
from flask_restful import reqparse

app = Flask(__name__, static_folder='client/build/', static_url_path='/')
api = Api(app)


def md5sum(path):
    return hashlib.md5(open(path,'rb').read()).hexdigest()

def sanitize_filename(a: str):
    allowed = string.ascii_letters + string.digits + '_.-/'
    a = a.replace('..', '_')

    filename = ''
    for i in a:
        if i not in allowed:
            i = '_'
        filename += i

    return filename

def get_md(path: str, checksum: str):
    real_path = os.path.abspath(os.path.dirname(path))
    filecontent = open(path,'r').read()

    # get the extension of the file
    extension = path.split('.')[-1]
    # if the extension is not md and the file has an extension
    if extension != 'md' and extension != real_path:
        # put unknown text into codeblock
        filecontent  = f"```{extension}\n\n{filecontent} \n\n```"


    # make request to github
    githubMd = requests.post(
            "https://api.github.com/markdown",
            json = {
                "mode": "gfm",
                "text": filecontent
            }
    )

    # a very bad way to setup boilerplate html
    # TODO: replace this with flask templates
    html = """<!DOCTYPE html>
    <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css" integrity="sha512-Oy18vBnbSJkXTndr2n6lDMO5NN31UljR8e/ICzVPrGpSud4Gkckb8yUpqhKuUNoE+o9gAb4O/rAxxw1ojyUVzg==" crossorigin="anonymous" />
        <style>
            .markdown-body {
                box-sizing: border-box;
                min-width: 200px;
                max-width: 980px;
                margin: 0 auto;
                padding: 45px;
            }

            @media (max-width: 767px) {
                .markdown-body {
                    padding: 15px;
                }
            }
        </style>
    </head>
    <p id='checksum' style="display: none">""" + checksum + """</p>
    <script>
        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
        const update = async () =>
        {
            while (1)
            {
                const response = await fetch('/api/hash/"""+ path.strip('files/') +"""');
                const json = await response.json();
                if (json['hash'] != document.getElementById('checksum').innerHTML)
                {
                    window.location.reload()
                }
                await sleep(500);
            }
        }
        update()
    </script>
    <article class="markdown-body">\n""" +  str(githubMd.text)
    return html




class render(Resource):
    def get(self, path):
        path = "files/" + sanitize_filename(path)
        res = make_response(get_md(path, md5sum(path)))
        res.headers['Content-Type'] = 'text/html'
        return res


class get_hash(Resource):
    def get(self, path):
        path = "files/" + sanitize_filename(path)
        return {'hash': md5sum(path)}


class files(Resource):
    def get(self):
        # any files in the static folder can be freely returned
        # this can be used for images and stuff
        parser = reqparse.RequestParser()
        parser.add_argument("file")
        args = parser.parse_args()
        file_path = args.get("file")
        
        try:
            with open('files/'+file_path,'rb') as file:
                encoded_file = base64.b64encode(file.read()).decode()
        except:
            return "No such file",400

        return {
            "encoded_file": encoded_file
        }
        
        #return send_file("files/"+sanitize_filename(file_path))

    def post(self):
        if not request.get_json(): return "no data sent", 400
        if not request.get_json().get('path'): return "path is missing", 400

        # get path,filedata
        path = request.get_json().get('path')
        filedata = base64.b64decode(request.get_json().get('data').encode('utf-8'))

        # sanitize
        path = sanitize_filename(path)

        with open('files/'+path, 'wb+')as outfile:
            outfile.write(filedata)

        return {'path': '/file/path'}

class folder(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("node")
        args = parser.parse_args()
        node = args.get("node")
        node_path = sanitize_filename(node)
        _,directories,files = next(os.walk('files/'+node_path))
        return {
                "node": node,
                "dir_children": directories,
                "files_children": files
        }

    def post(self):
        if not request.get_json(): return "no data sent", 400
        if not request.get_json().get('path'): return "path is missing", 400

        path = request.get_json().get('path')

        sanitized_path = sanitize_filename(path)

        print(sanitized_path)
        try:
            os.mkdir('files/'+sanitized_path)
        except:
            return "Wrong path", 400
        
        return {"success": True}


class ls(Resource):
    def get(self):
        files =  os.listdir('files/')
        return {'files': files}


class update(Resource):
    def put(self, path):
        if not request.get_json(): return "no data sent", 400
        if not path: return "filename was not part of the path", 400


        # sanitize path
        path = "files/" + sanitize_filename(path)


        # get needed data from client
        data = request.get_json()
        changes = data.get('changes')


        # for each change sent by the client
        for change in changes:
            print(change)
            text = change.get('data')
            line_num = int(change.get('line'))


            # update the specified line
            for line in fileinput.input(path, inplace=True):
                if fileinput.filelineno() == line_num:
                    print(text)
                else:
                    print(line, end='')

        # cool
        return "OK", 200


api.add_resource(get_hash, '/api/hash/<path>')
api.add_resource(update, '/api/update/<path>')
api.add_resource(files, '/api/file/')
api.add_resource(ls, '/api/ls')
api.add_resource(folder,'/api/folder/')
api.add_resource(render, '/render/<path>')









if __name__ == "__main__":
    # make sure the files folder exists
    if not os.path.exists("files/"):
        os.mkdir('files')
    elif not os.path.isdir('files'):
        print('files has to be a folder')
        sys.exit(-1)


    if not os.path.exists("static"):
        os.mkdir('static')
    elif not os.path.isdir('static'):
        print('static has to be a folder')
        sys.exit(-1)

    app.run(host='0.0.0.0', port=5000, debug=True)

