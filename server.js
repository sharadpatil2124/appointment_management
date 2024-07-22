const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config;
const routesAPI = require('./routes/api');
// const { mongo } = require('mongoose');
const mongoDB = require('./config/db');

const app = express();
port = 7000;

app.use(express.json());
app.use(bodyParser.json());

mongoDB.connectDB(); 

app.use('/api',routesAPI)

app.listen(port,() => console.log("server started at ...",port));

 