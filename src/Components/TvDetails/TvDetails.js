import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function TvDetails() {
  let baseUrl = 'https://image.tmdb.org/t/p/original/'
  const [Details, setDetails] = useState({})
  const [Geners, setGeners] = useState([])

  let params = useParams();
 async function GetDetails() {
    let {data} = await axios.get(`https://api.themoviedb.org/3/tv/${params.id}?api_key=962235938e93a7ebd52595b7579413dd&language=en-US`)
 
 setDetails(data)
 console.log(data)
 setGeners(data.genres)
 console.log(Geners)
  }
  
  useEffect(() => {
   GetDetails();
  }, [])
  return (
    
    <div className='container mt-5'>
    <div className='row '>
      <div className='col-md-4 col-sm-12'>
        <img src={baseUrl+Details.poster_path} alt="" className='w-100'/>
        
      </div>
      <div className='col-md-8 col-sm-12'>
        <div className='ms-5'>
          
     
        <h2 className='fw-bolder mt-4 mb-4'> {Details.name}.</h2>
        <p className='fw-bolder'>  First air date : <span className='ms-3'> {Details.first_air_date}  </span> </p>
        <p className='fw-bolder' > vote_average : <span className='ms-3' >  {Details.vote_average}  </span></p>
        <p className='fw-bolder'> overview : <span className='ms-3'>  {Details.overview} </span> </p>
        <div className='mt-5'>
        <span  className='mt-5 fw-bolder me-5'> category : </span>
        {
          Geners.map((movie , index)=>
          <button key={index} type="" className='btn'> {movie.name}</button>
          )
        }
         <img src={baseUrl+Details.backdrop_path} className='w-100 mt-5 mb-5' alt=""/>
       
        </div>
       
      
        </div>

      </div>
      <div className='col-md-12'>
     
        
      </div>
     
    </div>
  </div>
  )
}
