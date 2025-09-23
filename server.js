const express = require("express");
const path = require("path");
const app = express();
const yaml = require('js-yaml');
const fs = require('fs');
const WebSocket = require('ws');
const http = require('http');
const https = require('https');
let server;
// #region config.yaml reading here
const fileContents = fs.readFileSync('config.yaml', 'utf8');
const config = yaml.load(fileContents);
let httpOrHTTPS = false; // http = false, https = true

const PORT = config.port;

let LISTENING = config.listen;
if (LISTENING === "local") {LISTENING = '127.0.0.1';}
else if (LISTENING === "all") {LISTENING = '0.0.0.0'} 

const betterConsole = config.alerts;

if (config.https) {
    const options = {
        key: fs.readFileSync(config.crtlocation),
        cert: fs.readFileSync(config.keylocation)
    };
    server = https.createServer(options, app);
    httpOrHTTPS = true;
}
if (config.https === false) {
    server = http.createServer(app);
}
// #endregion 


const wss = new WebSocket.Server({ server});
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        if (betterConsole) {console.log('received: %s', message);}
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                let array = JSON.parse(message.toString());
                let now = new Date();
                let timeString = now.toLocaleTimeString();
                let string = array[0] + " (" + timeString + "): " + array[1];
                client.send(string);
            }
        });
    });
});
//#endregion

app.use(express.static(path.join(__dirname, "public")));

server.listen(PORT, LISTENING, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Listening on ${LISTENING}`);
  if (httpOrHTTPS) {console.log("Using HTTPS!")} else {console.log("Using HTTP!");}
});