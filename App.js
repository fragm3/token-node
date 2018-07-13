var express = require('express')
var bodyParser = require('body-parser')

var app = express()

var token = require('./routes/token')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/Token', token)
app.listen('3000', () => console.log("Server running on 3000 port"))

