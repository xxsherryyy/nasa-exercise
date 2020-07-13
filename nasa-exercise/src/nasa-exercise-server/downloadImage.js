const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')

 function downloadImage () {  
  const url = 'http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02070/opgs/edr/fcam/FLB_581260549EDR_F0701752FHAZ00341M_.JPG'
  const path = Path.resolve(__dirname, 'images', 'code.jpg')
  const writer = Fs.createWriteStream(path)


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
