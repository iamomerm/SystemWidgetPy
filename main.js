const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')

function createWindow () {
    let WIN = new BrowserWindow({
        width: 750,
        height: 275,
        webPreferences: { nodeIntegration: true, contextIsolation: false}
    });
    WIN.removeMenu();
    WIN.webContents.on('devtools-opened', () => { WIN.webContents.closeDevTools()});
    WIN.setResizable(false);
    WIN.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));
    WIN.on('closed', () => {WIN = null});
}

app.on('ready', () => {createWindow()});
app.on('window-all-closed', () => {app.quit()});
