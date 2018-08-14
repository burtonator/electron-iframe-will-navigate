"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_2 = require("electron");
const BROWSER_OPTIONS = {
    backgroundColor: '#FFF',
    webPreferences: {
        webSecurity: false,
    }
};
electron_1.app.on('ready', () => __awaiter(this, void 0, void 0, function* () {
    let window = new electron_2.BrowserWindow(BROWSER_OPTIONS);
    window.webContents.on('will-navigate', (e, url) => {
        console.log("Attempt to navigate to new URL: ", url);
        e.preventDefault();
        electron_1.shell.openExternal(url);
    });
    window.webContents.on('did-navigate-in-page', (e, url) => {
        console.log("did-navigate-in-page: ", url);
    });
    window.webContents.once('did-finish-load', () => {
        console.log("Window loaded");
        console.log("FIXME: WebContents: ", electron_1.webContents);
        electron_1.webContents.getAllWebContents().forEach((current) => __awaiter(this, void 0, void 0, function* () {
            console.log("============");
            console.log("Found webContents ID: ", current.id);
            console.log("Found webContents:", current);
            console.log("FIXME location: ", yield current.executeJavaScript('document.location.href;'));
        }));
    });
    window.webContents.on('did-attach-webview', () => {
        console.log("attached webview");
    });
    window.loadURL('file:' + __dirname + '/app.html');
}));
//# sourceMappingURL=index.js.map