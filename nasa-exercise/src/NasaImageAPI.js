import axios from 'axios';

const axios = require('axios');

// Make a request for a user with a given ID
axios.get('https://api.nasa.gov/planetary/apod?api_key=Jj8XIAvxzNttxgiR03wEMLfEO4hZIoTfuSst6b9P')
export default {
    getRoverList() {
      return HTTP.get('/api/v1/rovers');
    },
  
    getDateList() {
      return HTTP.get('/api/v1/dates');
    },
  
    getPhotoList(roverName, date) {
      return HTTP.get(`/api/v1/rovers/${roverName}/photos?earth_date=${date}`);
    },
  
    getPhotoUrl(photo) {
      return `${BASE_URL}/api/v1/rovers/${photo.rover.name}/photos/${photo.id}?img_src=${photo.img_src}`;
    }
  }