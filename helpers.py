"""
File responsible for arbitrary/helper functions that just dont have a place anywhere else
eg:
    - encoding
    - sanitization
    - checksums
"""

import string
import base64
import hashlib
from flask_restful import reqparse

SUCCESS = {'success':True}

def md5sum(path):
    "return the md5sum of a file"
    return hashlib.md5(open(path,'rb').read()).hexdigest()



def sanitize_filename(a: str):
    "sanitize filenames before working with them on disk"
    allowed = string.ascii_letters + string.digits + '_.-/'
    a = a.replace('..', '_')

    filename = ''
    for i in a:
        if i not in allowed:
            i = '_'
        filename += i

    return filename

def parse_get(param):
    parser = reqparse.RequestParser()
    parser.add_argument(param)
    args = parser.parse_args()
    return args.get(param)
