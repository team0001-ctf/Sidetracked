const { app, BrowserWindow } = require('electron');
const path = require('path');
const communication = require('../utils/communication');

const createHomePage = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true
      }
    });
    
    // Take up our whole screen on launch
    mainWindow.maximize()
  
    // and load the homePage for our app
    mainWindow.loadFile(path.join(__dirname, 'homePage.html'));
  
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Testing the getFile route to make sure it works
    communication.getFile( {"file": "/notes/testNote.md"} )
};

module.exports = { createHomePage: createHomePage }