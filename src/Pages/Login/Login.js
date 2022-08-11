import React, { useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios'
import Aos , {init} from 'aos'
import 'aos/dist/aos.css'
import Joi from "joi"
import { useNavigate } from 'react-router-dom'


export default function Login(props) {

  let navigate = useNavigate()
  const [IsLoading, setIsLoading] = useState(false)
  const [Error, setError] = useState()
  const [ErrorList, setErrorList] = useState([])
  const [User, setUser] = useState({
    
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
 
   async function LoginSubmit(e) {
    
    e.preventDefault();
    setIsLoading(true)
    let ValidationResult = Validation(User)
    if (ValidationResult.error) {
      setIsLoading(false)
      setErrorList(ValidationResult.error.details)
      
    }
    else{
   
    let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signin' , User)
    console.log(data)
    if (data.message === 'success') {

      localStorage.setItem('userToken' , data.token)
      setIsLoading(false)
      props.GetUserData();
      navigate('/Home')

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

email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

})    
return schema.validate(User , {abortEarly:false});
  }
  return (
    <div className='container mt-5 parent'>
      <div className='Login mb-5 mt-5'>
          <h2> Login Form </h2>
        </div>
      <div className='form '>
<div>
  {ErrorList.map((error , index)=>
  {
    if (index === 4) {
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

        <form className='py-4' onSubmit={LoginSubmit}>
   
        
     
      
      <label htmlFor="email" className='  my-1  '> Email :</label>
      <input type="text" className='form-control my-3 ' name="email" id='email'
        onChange={GetUser} />

       <label htmlFor="password" type="password" className='  my-1  '> Password :</label>
      <input type="password" className='form-control my-3 ' name="password" id='password'
        onChange={GetUser} />

    
      <button type="submit" className='btn my-2'> 
      {IsLoading? <i className='fas fa-spinner fa-spin'></i> : 'Login' }
      </button>
                
      </form>
      </div>

  
</div>
  )
}
