import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const NASA_API_KEY = 'ksjpq40PnZJmonXhEse335B0p5uJY5gTBvSU3nj1'; // Replace with your NASA API key
const NASA_API_KEY = 'Your_key'; // Replace with your NASA API key

const Community = () => {
  const [apodData, setApodData] = useState([]);

  useEffect(() => {
    // Fetch APOD data or use from localStorage if available
    const fetchApodData = async () => {
      const storedData = localStorage.getItem('apodData');
      if (storedData) {
        setApodData(JSON.parse(storedData)); // Use data from localStorage
      } else {
        try {
          const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=10`);
          setApodData(response.data);
          localStorage.setItem('apodData', JSON.stringify(response.data)); // Save data to localStorage
        } catch (error) {
          console.error('Error fetching APOD data:', error);
        }
      }
    };

    fetchApodData();
  }, []);

  return (
    <div className='absolute pt-[15vh] bg-black overflow-hidden'>
      <h1 className='text-center text-[32px] font-bold text-[yellow]'>Astronomy News</h1>
      {apodData.map((apod, index) => (
        <div key={index} className="mt-[5vh]">
          <hr />
          <h2 className="text-[24px] font-bold text-[purple]">{apod.title}</h2>
          <p className="text-[20px]">{apod.date}</p>
          <div  className="pl-[35%] object-contain">
            <img src={apod.url} alt={apod.title} className="h-[50vh]" />
          </div>
          <p>{apod.explanation}</p>
        </div>
      ))}
    </div>
  );
};

export default Community;
