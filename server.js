const express = require('express');
const http = require('http');
const app = require('./app');
const bodyParser = require('body-parser');
const server = http.createServer(app);

app.use(bodyParser.json());

server.listen(3000,console.log('app is running'));

