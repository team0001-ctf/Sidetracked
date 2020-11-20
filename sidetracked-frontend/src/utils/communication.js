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
    var ret = "";
    var url_t = server_url + "/api/v0/file/";
    request({
        body: JSON.stringify(json_data),
        followAllRedirects: true,
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        url: url_t
    }, function (error, res, body) {});
    return ret;
}

async function getFile(file, cb) {
    var ret = "";
    var url_t = server_url + "/api/v0/file/";
    request({
        followAllRedirects: true,
        headers: {
            'Content-Type': 'application/json',
            'file': file,
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

module.exports = 
{ 
    getFile: getFile,
    listFiles: listFiles ,
    sendFile: sendFile
}