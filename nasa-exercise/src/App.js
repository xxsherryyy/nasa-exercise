import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import downloadImage from '../src/nasa-exercise-server/downloadImage'

const App = () => {
  const fs = require ('fs')
// const Path = require ('path')
const download = require("download")

const API_KEY = process.env.REACT_APP_NASA_API_KEY;

  //useState hook with array destructuring 
  const [data, setData] = useState()
  const [images, setImages] = useState([])

  const getData = async (date) => {
    try {
      const { data } = await axios({
        method: 'GET', //you can set what request you want to be
        url: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=DEMO_KEY`,
        params: {
          // key values pairs   
        }
      })
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }


  };

  const updateSearch = async (e) => {
    const data = await getData(e.target.value)
    setImages(data.photos)
    console.log(data.photos)
  };


  return (
    <div>
      <div>NASA Rover Exercise</div>
      {/* <button value="2018-6-02" onClick={() => getData("2018-6-02")}>{data}June 2nd, 2018</button> */}
      <select onChange={updateSearch}>
        <option value="">Select date</option> 
        <option value="2018-6-02" >June 2nd, 2018</option>
        <option value="2018-04-31" >April 21st, 2018</option>
        <option value="2017-02-27">Feb 27th 2017</option>
        <option value="2016-7-13">July 13th 2016</option>
      </select>
        <div>{<button onClick={() => downloadImage()}  >download images</button>}</div>

      <div className="images">
        {images.map(image => <img className='image' key={image.img_src} src={image.img_src}  />)}
      </div>
    </div>
  )

}



//   console.log(process.env.REACT_APP_NASA_API_KEY)


export default App;
