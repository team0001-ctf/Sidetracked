from flask import Flask, render_template, request, make_response
from flask_restful import Resource, Api


from api import hearbeat
from api import list_files
from api import upload_files
from api import download_files


app = Flask(__name__)
api = Api(app)

class index(Resource):
    def get(self):
        response = make_response(render_template('index.html'))
        response.headers['Content-type'] = 'text/html'
        return response

#returning request.get_json is just for lack of anything else and will not be the case in the end

class api_files(Resource):
    def get(self):
        response = download_files(request.get_json)
        return request.get_json(), response
    def post(self):
        response = upload_files(request.get_json)
        return request.get_json(), response


class api_ls(Resource):
    def get(self):
        response = list_files(request.get_json)
        return request.get_json(), response


class api_heartbeat(Resource):
    def get(self):
        response = hearbeat(request.get_json)
        return request.get_json(), response


api.add_resource(index, '/')
api.add_resource(api_ls, '/api/v0/ls/')
api.add_resource(api_files, '/api/v0/file/')
api.add_resource(api_heartbeat, '/api/v0/hearbeat/')


if __name__ == "__main__":
    app.run(host='localhost', port=5000, debug=True)
