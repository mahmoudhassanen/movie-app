
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import {  Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ActorDetails from './Components/ActorDetails/ActorDetails';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import Navbar from './Components/Navbar/Navbar';
import TvDetails from './Components/TvDetails/TvDetails';
import Actor from './Pages/Actor/Actor';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Movie from './Pages/Movie/Movie';
import NotFound from './Pages/NotFound/NotFound';
import Register from './Pages/Register/Register';
import TvShow from './Pages/TVShow/TvShow';

function App() {

  let navigate = useNavigate();
  const [UserData, setUserData] = useState(null)
function GetUserData() {
 let Decoded =  jwtDecode(localStorage.getItem('userToken'))
 setUserData(Decoded)
  
}

useEffect(() => {
 if (  localStorage.getItem('userToken')) {
  GetUserData();
 }
}, [])


function LogOut() {
  localStorage.removeItem('userToken')
  setUserData(null)
    navigate('Login')
  
}
function ProtectedRoute({children}) {
  if ( !localStorage.getItem('userToken')) {
    return <Navigate to='/Login'/> 
  }
  else
  {
return children
  }
}
useEffect(() => {
 console.log(UserData)
}, [UserData])

  return (
    <div className="App">
     <Navbar UserData={UserData} LogOut={LogOut}/>
     <Routes>
     <Route path='/' element={ <ProtectedRoute> <Home/> </ProtectedRoute>  }></Route>
      <Route path='Home' element={ <ProtectedRoute> <Home/>  </ProtectedRoute> }></Route>
      <Route path='Movie' element={ <ProtectedRoute>  <Movie/> </ProtectedRoute> }></Route>
      <Route path='TvShow' element={ <ProtectedRoute>  <TvShow/> </ProtectedRoute> }></Route>
      <Route path='Actor' element={  <ProtectedRoute>  <Actor/>  </ProtectedRoute>  }></Route>
      <Route path='moviedetails' element={<ProtectedRoute>  <MovieDetails/> </ProtectedRoute>}> 
           <Route path=':id' element={ <MovieDetails/>} />
      </Route>
      <Route path='tvdetails' element={<ProtectedRoute>  <TvDetails/> </ProtectedRoute>}> 
           <Route path=':id' element={ <TvDetails/>} />
      </Route>
      <Route path='actordetails' element={<ProtectedRoute>  <ActorDetails/> </ProtectedRoute>}> 
           <Route path=':id' element={ <ActorDetails/> } />
      </Route>
      
      <Route path='*' element={  <NotFound/> }></Route>
      <Route path='Login' element={  <Login GetUserData={GetUserData}/>  }></Route>
      <Route path='Register' element={ <Register/> }></Route>



     </Routes>
    </div>
  );
}

export default App;
