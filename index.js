const express = require("express");
const consign = require("consign");
const bodyParser = require("body-parser")
var session = require('express-session');
var path = require('path');

const app = express();
const port = 3000;


//use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    cookie: { secure: true }
}));


app.set("view engine", "ejs")
app.set('views', './src/views');
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use('/uploads', express.static(process.cwd() + '/uploads'));
    
consign({ cwd: 'src'})
    .include('routes')
    .then('controllers')
    .then("db")
    .into(app);


app.listen(port, () => console.log("Listening on port " + port));