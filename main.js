/**
 * @todo implement build using npm and add dependency
 */

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var Menu = require('menu');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  //if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //'node-integration' : false,
    icon: __dirname + '/app/images/icon.png', title: 'BookChat'
  });

  // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

  // Open the devtools.
  //mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });


    if (process.platform == 'darwin') {
        // menu
        var menu  = Menu.buildFromTemplate(createMenu(mainWindow));
        app.setApplicationMenu(menu);
    }
});

function createMenu(window) {
    return [
        {
            'label': 'template',
            submenu: [
                {
                    label: 'Hide Chat',
                    selector: 'hide:',
                    accelerator: 'CommandOrControl+H'
                },
                {
                    label: 'Exit',
                    accelerator: 'CommandOrControl+Q',
                    click: function (item, window) { app.quit(); }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'CommandOrControl+Z',
                    selector: 'undo:'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+CommandOrControl+Z',
                    selector: 'redo:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Cut',
                    accelerator: 'CommandOrControl+X',
                    selector: 'cut:'
                },
                {
                    label: 'Copy',
                    accelerator: 'CommandOrControl+C',
                    selector: 'copy:'
                },
                {
                    label: 'Paste',
                    accelerator: 'CommandOrControl+V',
                    selector: 'paste:'
                },
                {
                    label: 'Select All',
                    accelerator: 'CommandOrControl+A',
                    selector: 'selectAll:'
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'Command+R',
                    click: function() { window.reload(); }
                },
                {
                    label: 'Toggle DevTools',
                    accelerator: 'Alt+Command+I',
                    click: function() { window.toggleDevTools(); }
                }
            ]
        },
        {
            label: 'Window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'Command+M',
                    selector: 'performMiniaturize:'
                },
                {
                    label: 'Close',
                    accelerator: 'Command+W',
                    selector: 'performClose:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Bring All to Front',
                    selector: 'arrangeInFront:'
                }
            ]
        }
    ];
}
