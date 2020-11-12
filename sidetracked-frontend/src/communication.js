// This file contains all the routes to the backend

const request = require('request');
const server_url = 'localhost:8080'

function tick(file_name = null) {
    request({ 
        body: {}, 
        followAllRedirects: true,
        headers: {
           'Content-Type': 'application/json',
           'Referer': 'www.pathofexile.com/trade/search/Incursion',
           'Host': 'www.pathofexile.com',
           'X-Requested-With': 'XMLHttpRequest' },
        method: 'POST',
        url: server_url + "/tick"
    }, handle_tick);
}

function sendFile(file) {
    request({ 
        body: {}, 
        followAllRedirects: true,
        headers: {
           'Content-Type': 'application/json',
           'X-Requested-With': 'XMLHttpRequest' },
        method: 'UPDATE',
        url: server_url + "/sendFile"
    }, handle_sendFile);
}

function getFile(file_name) {
    request({ 
        body: {}, 
        followAllRedirects: true,
        headers: {
           'Content-Type': 'application/json',
           'X-Requested-With': 'XMLHttpRequest' },
        method: 'GET',
        url: server_url + "/getFile"
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