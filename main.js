const electron = require('electron')
const url = require('url')
const path = require('path')

const {app, BrowserWindow, Menu} = electron

let mainWindow

// Listen for the app to be ready 
app.on('ready', function() {
    // create new window
    mainWindow = new BrowserWindow({})
    // load HTML file in to window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file', 
        slashes: true
    }))

    // Quit app when closed
    mainWindow.on('closed', function(){
        app.quit()
    })

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    // Insert menu
    Menu.setApplicationMenu(mainMenu) 
})


// Handle and Create Shopping Window
function createAddWindow(){
    // create new window
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item'
    })
    // load HTML file in to window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file', 
        slashes: true
    }))
    
    // Garbage collection handle
    addWindow.on('close', function(){
        addWindow = null
    })

    // BUild menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    // Insert menu
    Menu.setApplicationMenu(mainMenu) 
}


// Menu Template
const mainMenuTemplate = [
    {
        label: 'Electron',
        submenu: [{
            label: 'Foo',
            accelerator: 'CmdOrCtrl+F',
            role: 'foo'
        }]
    },
    {
        label: 'File',
        submenu: [{
            label: 'Add Item',
            accelerator: process.platform == 'darwin' ?  'Command+A' : 'Ctrl+A',
            role: 'Add',
            click(){
                createAddWindow()
            }
        },
        {
            label: 'Clear Items',
            accelerator: process.platform == 'darwin' ?  'Command+C' : 'Ctrl+C',
            role: 'Add'
        },
        {
            label: 'Quit',
            accelerator: process.platform == 'darwin' ?  'Command+Q' : 'Ctrl+Q',
            click(){
                app.quit()
            }
        }]
    }
]

// 24:00 on video