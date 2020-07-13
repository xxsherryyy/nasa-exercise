import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
// import download from 'downloadjs';

const App = () => {

  const API_KEY = process.env.REACT_APP_NASA_API_KEY;

  //useState hook with array destructuring 

  const [images, setImages] = useState([])
  const [error, setError] = useState("")

  //Retrieve NASA Curiosity Rover Images
  const getData = async (date) => {
    try {
      const { data } = await axios({
        method: 'GET', //you can set what request you want to be
        url: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${API_KEY}`,
      })
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }

  };

  const updateSearch = async (e) => {
    const data = await getData(e.target.value)
    try {
      if (data.photos[0]) {     //check image value
        setImages(data.photos)
        setError('')
        console.log(data.photos)
      }
    } catch {
      setError("No Images")
      setImages([])
      console.log('Error: No Images')
    }
  };

  //POST request to download file
  const handleSubmit = async (images) => {
    const response = await fetch('/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: { images } }),
    });
    console.log(images)
    return response

  };

  return (
    <div>
      <div className="App-header">NASA Rover Exercise</div>
      <div className="dropdown">
        <select onChange={updateSearch}>
          <option value="">Select date</option>
          <option value="2018-6-02" >June 2nd, 2018</option>
          <option value="2018-04-31" >April 21st, 2018</option>
          <option value="2017-02-27">Feb 27th 2017</option>
          <option value="2016-7-13">July 13th 2016</option>
        </select>
      </div>

      <div className="images">
        <b>{error}</b>
        {images.map(image => <img className='image' key={image.img_src} src={image.img_src} alt="roverImg" />)}
      </div>

      <button className="downloadBtn" onClick={async () => { await handleSubmit({ post: images.map(image => image.img_src) }); }}> Download Images</button>

    </div>
  )
}

export default App;
