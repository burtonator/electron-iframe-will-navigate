import {app, shell, webContents} from 'electron';
import {BrowserWindow} from "electron";

const BROWSER_OPTIONS = {
    backgroundColor: '#FFF',

    // NOTE: the default width and height shouldn't be changed here as it can
    // break unit tests.

    //width: 1000,
    //height: 1000,

    webPreferences: {
        webSecurity: false,
    }

};

app.on('ready', async () => {

    let window = new BrowserWindow(BROWSER_OPTIONS);

    window.webContents.on('will-navigate', (e, url) => {
        console.log("Attempt to navigate to new URL: ", url);
        // required to force the URLs clicked to open in a new browser.  The
        // user probably / certainly wants to use their main browser.
        e.preventDefault();
        shell.openExternal(url);
    });

    // window.webContents.on('will-frame-navigate', (e: any, url) => {
    //     console.log("Attempt to navigate to new URL: ", url);
    //     // required to force the URLs clicked to open in a new browser.  The
    //     // user probably / certainly wants to use their main browser.
    //     e.preventDefault();
    //     shell.openExternal(url);
    // });

    window.webContents.on('did-navigate-in-page', (e, url) => {
        console.log("did-navigate-in-page: ", url);
        // // required to force the URLs clicked to open in a new browser.  The
        // // user probably / certainly wants to use their main browser.
        // e.preventDefault();
        // shell.openExternal(url);
    });


// did-finish-load
    // webContents: WebContents
    // did-frame-finish-load
    // did-attach-webview

    window.webContents.once('did-finish-load', () => {

        console.log("Window loaded");

        console.log("FIXME: WebContents: " , webContents);

        webContents.getAllWebContents().forEach(async current => {
            console.log("============");
            console.log("Found webContents ID: ", current.id);
            console.log("Found webContents:", current);
            console.log("FIXME location: ", await current.executeJavaScript('document.location.href;'));
        });


    });

    window.webContents.on('did-attach-webview', () => {

        console.log("attached webview");

    });


    window.loadURL( 'file:' + __dirname + '/app.html');

});


