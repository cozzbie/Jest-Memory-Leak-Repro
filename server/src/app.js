/* 
 * File: app.js (entry)
 *
 * Description: This file handles the main operations of the server. It sets up Express and it's middleware and handles
 * all data.
 * 
 * Created by Jamie Corkhill on 04/23/2019
 */
require('./db/mongoose');

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Tell Express to return index.html and leave routing to the client.
const publicDirectoryPath = path.join(__dirname, '/public');

// Express middleware
app.use(express.json());
app.use(express.static(publicDirectoryPath));

app.use(cors()) // TODO: DANGER - Remove this in production

module.exports = app;