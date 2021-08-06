const express = require("express");
const app = express();
const port = 9000;

app.get("/", (req, res) => {
    res.send("RESPONSE FROM SERVER");
});

app.listen(port, () => {
    console.log("express server is running on port 9000..");
});