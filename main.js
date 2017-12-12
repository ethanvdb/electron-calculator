const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function(){
    // Create new window
    mainWindow = new BrowserWindow({
        width: 350,
        height: 550,
        title: 'Electron-Calculator',
    });
    // Load HTML
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));
    // Quit app when main window is closed
    mainWindow.on('closed', function(){
        app.quit();
    });


    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert Menu
    Menu.setApplicationMenu(mainMenu);

});

// Create menu template
const mainMenuTemplate = [
    {
        accelerator: process.platform == 'darwin' ? 'Command+W' :
        'Ctrl+W',
        click(){
            app.quit();
        }
    },
    {
        accelerator: process.platform == 'darwin' ? 'Command+I' :
        'Ctrl+I',
        click(item, focusedWindow){
            focusedWindow.toggleDevTools();
        }
    }
];

// If mac, add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}