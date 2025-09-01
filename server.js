const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));


app.listen(PORT, LISTENING, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Listening on ${LISTENING}`);
});