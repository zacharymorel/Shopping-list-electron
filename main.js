const electron = require('electron')
const url = require('url')
const path = require('path')

const {app, BrowserWindow, Menu, ipcMain} = electron

// SET ENV
process.env.NODE_ENV = 'production'

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

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    // Insert menu
    Menu.setApplicationMenu(mainMenu) 
}

// CATCH item:add
ipcMain.on('item:add', function(e, item){
    // console.log(item)
    mainWindow.webContents.send('item:add', item)
    addWindow.close()
})

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
            role: 'Clear',
            click(){
                mainWindow.webContents.send('item:clear')
            }
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


// Add Develpoer tools to Menu list if not in Production
if(process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label : 'Developer Tools',
        submenu : [
            {
                label : 'Toggle DevTools',
                accelerator : process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools() 
                }
            },
            {
                role : 'reload'
            }
        ]
    })
}