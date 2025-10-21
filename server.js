const express = require("express");
const path = require("path");
const app = express();
const yaml = require('js-yaml');
const fs = require('fs');
const WebSocket = require('ws');
const http = require('http');
const https = require('https');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
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

let clientGlobal;
const wss = new WebSocket.Server({ server});
let mapOfOnline = new Map();
wss.on('connection', function connection(ws) {
    clientGlobal = ws;
    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);
        if (betterConsole) {if (message.includes('{"type":"user"') !== true) {console.log('received: %s', message);}}
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                if (data.type === "message") {
                    let now = new Date();
                    let timeString = now.toLocaleTimeString();
                    client.send(JSON.stringify({
                        type: "messages",
                        user: data.user,
                        contents: data.contents,
                        time: timeString
                    }));
                    if(betterConsole) {console.log("sent message")};
                }
                else if (data.type === "user") {                    
                    mapOfOnline.set(data.idLol, data.user);
                    let string = "";
                    mapOfOnline.forEach((name, id) => {
                        string += name + "<br>";
                    });
                    client.send(JSON.stringify({
                        type: "onlineUser",
                        contents: string
                    }));
                }
            }
        });
    });
    ws.on('close', () => {
        mapOfOnline.clear();
        if (betterConsole) {console.log("Cleared due to disconnect")};
    });
});


const askForInput = () => {
    rl.question('What would you like to send?', (answer) => {
        if (clientGlobal && clientGlobal.readyState === WebSocket.OPEN) {
            clientGlobal.send(JSON.stringify({
                type: "messages",
                user: "SERVER",
                contents: answer,
                time: "server"
            }));
        }
        else {
            console.log("Nobody is connected, wait for someone online. Crash would happen but this prevents it.");
        }
        askForInput();
    });
};
setTimeout(() => {
    askForInput();
}, 1000);


//#endregion

app.use(express.static(path.join(__dirname, "public")));

server.listen(PORT, LISTENING, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Listening on ${LISTENING}`);
  if (httpOrHTTPS) {console.log("Using HTTPS!")} else {console.log("Using HTTP!");}
});