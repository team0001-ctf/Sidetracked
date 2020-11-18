const request = require('request');
const server_url = 'http://localhost:5000'

function tick(json_data = null) {
    request({ 
        body: json_data, 
        followAllRedirects: true,
        headers: {
           'Content-Type': 'application/json',
           'Host': server_url + "/tick",
           'X-Requested-With': 'XMLHttpRequest' },
        method: 'POST',
        url: server_url + "/tick"
    }, handle_tick);
}

function sendFile(json_data) {
    request({ 
        body: json_data, 
        followAllRedirects: true,
        headers: {
           'Content-Type': 'application/json',
           'X-Requested-With': 'XMLHttpRequest' },
        method: 'UPDATE',
        url: server_url + "/api/v0/file/"
    }, handle_sendFile);
}

async function getFile(json_data) {
    var url_t = server_url + "/api/v0/file/"
    request({ 
        body: JSON.stringify(json_data), 
        followAllRedirects: true,
        headers: {
           'Content-Type': 'application/json',
        },
        method: 'GET',
        url: url_t
    }, handle_getFile);
}

function listFiles(dir_name, cb) {
    var ret = "";
    var url_t = server_url + "/api/v0/ls/";
    request({
        followAllRedirects: true,
        headers: {
            'Content-Type': 'application/json',
            'dir_name': dir_name,
        },
        method: 'GET',
        url: url_t
    }, function (error, res, body) {
        if (!error && res.statusCode === 200) { 
            cb(body)
         } else {
            cb(-1)
         }
    });
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

module.exports = 
{ 
    getFile: getFile,
    listFiles: listFiles 
}