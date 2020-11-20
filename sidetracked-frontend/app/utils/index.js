const request = require('request');

const server_url = 'http://localhost:5000';

const DATA = {
  [server_url + "/api/v0/ls/"]: {
    files: []
  },
};

function Request(
  callback,
  request_url,
  request_data = {},
  request_headers = {},
  request_method = 'POST',
) {
  console.log(callback, request_url, request_data, request_headers, request_method);
  callback(false, { statusCode: 200 }, DATA[request_url]);
  return;

  request({
    body: request_data,
    followAllRedirects: true,
    headers: Object.assign({
    }, {
      'Content-Type': 'application/json',
      'Host': request_url,
      'X-Requested-With': 'XMLHttpRequest'
    }, request_headers),
    method: request_method,
    url: request_url
  }, callback);
}

function tick(json_data = null) {
  Request(
    handle_tick,
    server_url + "/tick",
    json_data
  );
}

function sendFile(json_data) {
  Request(
    handle_sendFile,
    server_url + "/api/v0/file/",
    json_data,
    {},
    'UPDATE'
  );
}

async function getFile(file, cb) {
  var ret = "";
  Request(
    function(error, res, body) {
      if (!error && res.statusCode === 200) { 
        cb(body)
      } else {
        cb(-1)
      }
    },
    server_url + "/api/v0/file/",
    {},
    { 'file': file },
    'GET'
  );
  return ret;
}

function listFiles(dir_name, cb) {
  var ret = "";
  Request(
    function(error, res, body) {
      if (!error && res.statusCode === 200) { 
        cb(body)
      } else {
        cb(-1)
      }
    },
    server_url + "/api/v0/ls/",
    {},
    { dir_name },
    'GET'
  );
  return ret;
}

function handle_tick(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log('Tick received: \n' + body);
    } else {
        console.log("Tick Failed: \n" + body);
    }
};

function handle_sendFile(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log('sendFile received: \n' + body);
    } else {
        console.log("sendFile Failed: \n" + body);
    }
};

function handle_getFile(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log('getFile received: \n' + body);
    } else {
        console.log("getFile Failed: \n" + body);
    }
};

module.exports = {
    getFile: getFile,
    listFiles: listFiles
}

