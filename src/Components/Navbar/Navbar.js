import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
    
  return (
    <div>
        <nav className="navbar mx-2 navbar-expand-lg navbar-dark bg-transparent">
  <div className="container-fluid">
    <Link className="navbar-brand fw-bolder" to="Home">Noxe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-5  me-auto mb-2 mb-lg-0">
      {props.UserData ?  
<> 
<li className="nav-item me-3">
  <Link className="nav-link active" aria-current="page" to="Home">Home</Link>
</li>
<li className="nav-item  me-3">
  <Link className="nav-link active" aria-current="page" to="Movie">Movie</Link>
</li>
<li className="nav-item  me-3">
  <Link className="nav-link active" aria-current="page" to="TVShow">TVShow</Link>
</li>
<li className="nav-item  me-3">
  <Link className="nav-link active" aria-current="page" to="Actor">Actor</Link>
</li>
</>




 : ''  }
 </ul>
 <ul className="navbar-nav  mb-2 mb-lg-0">
    {
      props.UserData ? 
      <>
      <li className="nav-item  d-flex align-items-center me-4">

<i className="fa-brands fa-facebook-f mx-2"></i>
<i className="fa-brands fa-instagram mx-2"></i>
<i className="fa-brands fa-twitter mx-2"></i>
<i className="fa-brands fa-twitch mx-2"></i>

 </li>
       <li className="nav-item">
          <span className="nav-link active" aria-current="page" onClick={props.LogOut}>LogOut</span>
        </li>
      </>
      : 
     <> 
       <li className="nav-item  d-flex align-items-center me-4">

       <i className="fa-brands fa-facebook-f mx-2"></i>
       <i className="fa-brands fa-instagram mx-2"></i>
       <i className="fa-brands fa-twitter mx-2"></i>
       <i className="fa-brands fa-twitch mx-2"></i>

        </li>
        <li className="nav-item ">
          <Link className="nav-link active" aria-current="page" to="Login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="Register">Register</Link>
        </li>
       
        </>
      
       
      
    }
    </ul>

      
      
    </div>
  </div>
</nav>
    </div>
  )
}
