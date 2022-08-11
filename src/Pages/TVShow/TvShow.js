import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function TvShow() {

  let baseUrl = 'https://image.tmdb.org/t/p/original/'
  const [TrendingItems, setTrendingItems] = useState([])
  async function GetTrendingItems() {
    let {data} = await axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=962235938e93a7ebd52595b7579413dd')
    setTrendingItems(data.results)
    console.log(data.results);
  }
  useEffect(() => {
   GetTrendingItems();
  }, [])
  return (
<div className='container'>
      <div className='row mt-5'>
      
          
  
        <div className='col-md-4   d-flex align-items-center' >
          <div className='w-100'>
            
          <div className='brdr w-25 mb-4'>      </div>
          <h2>Trending</h2>
          <h2> Tv Show</h2>
          <h2> To Watch Now</h2>
          <p className='second mt-4 mb-4'> Most watched tvshow by week.</p>
          <div className='brdr'>      </div>
          </div>
        </div>
        {TrendingItems.map((movie , index)=>
        <div key={index} className='col-lg-2 col-md-2 col-sm-6 my-4'>
          <div>
            <Link to={`/tvdetails/${movie.id}`} > 
            <img src={baseUrl+movie.poster_path} alt="" className='w-100'/>
            <h5 className='fw-bolder text-center mt-2'> {movie.name} </h5>
            </Link>
          </div>
        </div>
        )}
        
      </div>

    </div>
  )
}
