const express = require("express");
const path = require("path");
const app = express();
const yaml = require('js-yaml');
const fs = require('fs');

// #region config.yaml reading here
const fileContents = fs.readFileSync('config.yaml', 'utf8');
const config = yaml.load(fileContents);

const PORT = config.port;
let LISTENING = config.listen;
if (LISTENING === "local") {LISTENING = '127.0.0.1';}
else if (LISTENING === "all") {LISTENING = '0.0.0.0'} 
const betterConsole = config.alerts;
let environment = config.environment;

// #endregion 

//#region endpoints

app.get('/send', (req, res) => {
let arrayThing = req.query;
    try {
        if (!arrayThing.username || !arrayThing.messageContents || !environment) {throw new Error("crash.");}
        // res.send( scrapeGrades(arrayThing.username, arrayThing.password, environment, hac));
        if (betterConsole) {console.log("Received message" + arrayThing);}
    }
    catch (error) {res.send("Not correct way to send data")};
});

//#endregion
app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, LISTENING, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Listening on ${LISTENING}`);
});