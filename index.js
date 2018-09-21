const express = require("express");
const load = require("express-load");
const bodyParser = require("body-parser")

const app = express();
const port = 3000;

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

load('routes')
    .into(app);


app.listen(port, () => console.log("Listening on port " + port));