'use strict';

const express = require('express');

// Constants
const PORT = 3001;
const HOST = '0.0.0.0';

// Server

const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')

 function downloadImage () {  
  const url = 'http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02070/opgs/edr/fcam/FLB_581260549EDR_F0701752FHAZ00341M_.JPG'
  const path = Path.resolve(__dirname, 'images', 'code.jpg')
  const writer = Fs.createWriteStream(path)

const server = express();

server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

  const response = Axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
} module.exports.downloadImage = downloadImage

downloadImage()

// app.get('/', (req, res) => {
//   res.send(downloadImage());
// });

// const downloadImage = async () => {  
//     await download('https://unsplash.com/photos/AaEQmoufHLk/download?force=true', "dist");
//     console.log("download")
//     fs.writeFileSync('images/nasa.jpg', await download('https://unsplash.com/photos/AaEQmoufHLk/download?force=true'));
//     download('https://unsplash.com/photos/AaEQmoufHLk/download?force=true').pipe(fs.createWriteStream('images/nasa.jpg'))
//     // const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true'
//     // const path = Path.resolve(__dirname, 'images', 'code.jpg')
//     // const writer = fs.createWriteStream(path)
  
//     // const response = await axios({
//     //   url,
//     //   method: 'GET',
//     //   responseType: 'stream'
//     // })
  
//     // response.data.pipe(writer)
  
//     // return new Promise((resolve, reject) => {
//     //   writer.on('finish', resolve)
//     //   writer.on('error', reject)
//     // })
//     await Promise.all([
//       'https://unsplash.com/photos/AaEQmoufHLk/download?force=true',
//       'https://unsplash.com/photos/AaEQmoufHLk/download?force=true'
//   ].map(url => download(url, 'dist')));

//   }

//   downloadImage()