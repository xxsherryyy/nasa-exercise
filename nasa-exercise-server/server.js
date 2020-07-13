'use strict';

const express = require('express');
const fs = require('fs')
const Path = require('path')
const Axios = require('axios')
const server = express();
const bodyParser = require('body-parser');
// Constants
const PORT = 3001;
const HOST = '0.0.0.0';
// const cors = require('cors');

// Server
server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

//GET
server.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

//POST
server.post('/download', (req, res) => {
  console.log(req.body);
  res.send(
    `POST request: ${req.body.post}`,
  )
    .then(() => {
      if (!req.body.post) {
        return resolve(req.body.post);
      } else {
        return reject(`no image received`)
      }
    })
    // Validate if the files exists
    .then((file) => {
      return new Promise((resolve, reject) => {
        if (fs.existsSync(`./files/${file}`)) {
          return resolve(`./files/${file}`)
        }
        return reject(`File '${file}' was not found.`);
      })
    })
    // Return the file to download
    .then((filePath) => {
      res.download(filePath);
    })
    // Catches errors and displays them
    .catch((e) => {
      res.status(400).send({
        message: "error" + e,
      });
    });
})


