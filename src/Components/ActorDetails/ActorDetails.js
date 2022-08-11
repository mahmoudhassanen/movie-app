import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ActorDetails() {
    let baseUrl = 'https://image.tmdb.org/t/p/original/'
    const [Details, setDetails] = useState({})
   
  
    let params = useParams();
   async function GetDetails() {
      let {data} = await axios.get(`https://api.themoviedb.org/3/person/${params.id}?api_key=962235938e93a7ebd52595b7579413dd&language=en-US`)
   
   setDetails(data)
   console.log(data)

    }
    
    useEffect(() => {
     GetDetails();
    }, [])
  return (
    <div className='container mt-5'>
    <div className='row mb-5'>
      <div className='col-md-4 col-sm-12'>
        <img src={baseUrl+Details.profile_path} alt="" className='w-100'/>
        
      </div>
      <div className='col-md-8 col-sm-12'>
        <div className='ms-5'>
          
     
        <h2 className='fw-bolder mt-4 mb-4'> {Details.name}.</h2>
        <p className='fw-bolder'>  Birthday : <span className='ms-3'> {Details.birthday}  </span> </p>
        <p className='fw-bolder' > Place of birth : <span className='ms-3' >  {Details.place_of_birth}  </span></p>
        <p className='fw-bolder'> Biography : <span className='ms-3'>  {Details.biography} </span> </p>
        
       
      
        </div>

      </div>
    
     
    </div>
  </div>
  )
}
