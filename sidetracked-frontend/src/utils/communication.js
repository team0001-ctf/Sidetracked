// This file contains all the routes to the backend

const request = require('request');
const fetch = require("node-fetch");
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
    url_t = server_url + "/api/v0/file/"
    console.log(url_t)
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

function listFiles(dir_name) {
    request({ 
        body: {}, 
        followAllRedirects: true,
        headers: {
           'Content-Type': 'application/json',
           'X-Requested-With': 'XMLHttpRequest' },
        method: 'GET',
        url: server_url + "/listFiles"
    }, handle_listFiles);
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

function handle_listFiles(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log('listFiles received: \n' + body);
    } else {
        console.log("listFiles Failed: \n" + body);
    }
};

module.exports = { getFile: getFile }