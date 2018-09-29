const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser")

const app = express();
const port = 3000;

app.set("view engine", "ejs")
app.set('views', './src/views');
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
    
consign({ cwd: 'src'})
    .include('routes')
    .then('controllers')
    .then("db")
    .into(app);


app.listen(port, () => console.log("Listening on port " + port));