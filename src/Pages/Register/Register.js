import React, { useEffect, useState } from 'react'
import './Register.css'
import axios from 'axios'
import Aos , {init} from 'aos'
import 'aos/dist/aos.css'
import Joi from "joi"
import { useNavigate } from 'react-router-dom'


export default function Register() {

  let navigate = useNavigate()
  const [IsLoading, setIsLoading] = useState(false)
  const [Error, setError] = useState()
  const [ErrorList, setErrorList] = useState([])
  const [User, setUser] = useState({
    first_name : '',
    last_name : '', 
    age : 0,
    email : '',
password : '',

  })
  useEffect(() => {
   Aos.init();
  }, [])
  
  
  function GetUser(e)
  {
let MyUser = {...User}
MyUser[e.target.name] = e.target.value
setUser(MyUser)
// console.log(User)
  }
 
   async function RegisterSubmit(e) {
    
    e.preventDefault();
    setIsLoading(true)
    let ValidationResult = Validation(User)
    if (ValidationResult.error) {
      setIsLoading(false)
      setErrorList(ValidationResult.error.details)
      
    }
    else{
   
    let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signup' , User)
    console.log(data)
    if (data.message === 'success') {
      
      setIsLoading(false)
      navigate('/Login')

    }
    else
    {
      setIsLoading(false)
let message = data.message
let result = message.substring(33 , 58)
setError(result);
console.log(result)
    }

    }
    
  }
  function Validation() {
const schema =  Joi.object({
first_name : Joi.string().alphanum().min(3).max(30).required(),
last_name : Joi.string().alphanum().min(3).max(30).required(),
age : Joi.number().min(15).max(30).required(),
email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

})    
return schema.validate(User , {abortEarly:false});
  }
  return (
    <div className='container mt-5 parent'>
      <div className='register mb-5 mt-5'>
          <h2> Register Form </h2>
        </div>
      <div className='form '>
<div>
  {ErrorList.map((error , index)=>
  {
    if (index ==4) {
      return  <div key={index} className="alert alert-light" data-aos="fade-right"    role="alert">
     Password Invalid
      </div>
      
      
    }
    else
    {
      return  <div key={index} className="alert alert-light" data-aos="fade-right"    role="alert">
     {error.message}
       </div>
    }
  }
 
  )}
{Error?<div className="alert alert-light" data-aos="fade-right"    role="alert">
{Error}
</div> : ''}
</div>    

        <form className='py-4' onSubmit={RegisterSubmit}>
   
        
      <label htmlFor="first_name" className='  my-1  '> First Name :</label>
      <input   type="text" className='form-control my-3 ' name="first_name" id='first_name'
      onChange={GetUser} />

      <label htmlFor="last_name" className='   my-1 '> Last Name :</label>
       <input type="text" className='form-control my-3  ' name="last_name" id='last_name' 
         onChange={GetUser}/>

      <label htmlFor="age" className=' my-1 '> age :</label>
      <input type="number" className='form-control my-3 ' name="age" id='age'
        onChange={GetUser} />
      
      <label htmlFor="email" className='  my-1  '> Email :</label>
      <input type="text" className='form-control my-3 ' name="email" id='email'
        onChange={GetUser} />

       <label htmlFor="password"  className='  my-1  '> Password :</label>
      <input type="password" className='form-control my-3 ' name="password" id='password'
        onChange={GetUser} />

    
      <button type="submit" className='btn my-2'> 
      {IsLoading? <i className='fas fa-spinner fa-spin'></i> : 'Register' }
      </button>
                
      </form>
      </div>

  
</div>
  )
}
