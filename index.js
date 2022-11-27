'use strict';
const pg = require("pg")
const express = require('express');
const db = require('./modules/db');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', async (req, res) => {
  const dbdata = await db.select('SELECT * FROM article');
  res.send(`Query realizada con éxito! => ${dbdata}`);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});