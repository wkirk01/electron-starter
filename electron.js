const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

require('electron-reload')(__dirname);

let window

function createWindow() {
    window = new BrowserWindow({ width: 750, height: 750, frame: true })

    // load the dist folder from Angular
    window.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools optionally:
    window.webContents.openDevTools()

    window.on('closed', () => {
        window = null
    })
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (window === null) {
        createWindow()
    }
})