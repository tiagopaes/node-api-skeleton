const express = require('express');
const requireDir = require('require-dir');
const cors = require('cors');
require('dotenv/config');
require('./src/config');
requireDir('./src/models');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', require('./src/routes'));

const port = process.env.APP_PORT || 3000;
app.listen(port);

console.log('App running on port ' + port);
