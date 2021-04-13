#!/usr/bin/env python3
# python imports
import os
import shutil
import sys
import time
import base64
import requests

from flask import Flask
from flask import request
from flask import redirect
from flask import send_file
from flask import make_response

from flask_restful import Api
from flask_restful import Resource
from flask_restful import reqparse
# local imports
import helpers


app = Flask(__name__, static_folder='client/build/', static_url_path='/')
api = Api(app)




class index(Resource):
    def get(self):
        return app.send_static_file('index.html')




class get_hash(Resource):
    def get(self, path):
        path = "files/" + helpers.sanitize_filename(path)
        return {'hash': helpers.md5sum(path)}





class files(Resource):
    def get(self):
        # any files in the static folder can be freely returned
        # this can be used for images and stuff
        file = helpers.parse_get("file")
        file_path = helpers.sanitize_filename(file)
        
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
        path = helpers.sanitize_filename(path)

        with open('files/'+path, 'wb+')as outfile:
            outfile.write(filedata)

        return {'path': '/file/path'}
    
    def delete(self):
        file = helpers.parse_get("file")
        file_path = helpers.sanitize_filename(file)

        try:
            os.remove('files/'+file_path)
        except:
            return "Error of some sort", 400
        
        return helpers.SUCCESS


class folder(Resource):
    def get(self):
        node = helpers.parse_get("node")
        node_path = helpers.sanitize_filename(node)
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

        sanitized_path = helpers.sanitize_filename(path)

        print(sanitized_path)
        try:
            os.mkdir('files/'+sanitized_path)
        except:
            return "Wrong path", 400
        
        return helpers.SUCCESS

    def delete(self):
        node = helpers.parse_get("node")
        if node:
            node_path = helpers.sanitize_filename(node)
            try:
                shutil.rmtree('files/'+node_path)
            except:
                return "Error of some sort", 400
        else:
            return "Oh you sneaky sneaky ! Can't remove root dir sorry",1337
        return helpers.SUCCESS



# api.add_resource(get_hash, '/api/hash/<path>')
api.add_resource(index,'/')
api.add_resource(folder,'/api/folder/')
api.add_resource(files, '/api/file/')



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























############################# code that should probably get removed Im just not entirely sure yet #################################################
#

# class update(Resource):
#     def put(self, path):
#         if not request.get_json(): return "no data sent", 400
#         if not path: return "filename was not part of the path", 400
#
#
#         # sanitize path
#         path = "files/" + sanitize_filename(path)
#
#
#         # get needed data from client
#         data = request.get_json()
#         changes = data.get('changes')
#
#
#         # for each change sent by the client
#         for change in changes:
#             print(change)
#             text = change.get('data')
#             line_num = int(change.get('line'))
#
#
#             # update the specified line
#             for line in fileinput.input(path, inplace=True):
#                 if fileinput.filelineno() == line_num:
#                     print(text)
#                 else:
#                     print(line, end='')
#
#         # cool
#         return "OK", 200

# api.add_resource(update, '/api/update/<path>')
