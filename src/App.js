import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home';
import { Route, Routes ,useNavigate ,Navigate } from "react-router-dom";
import Movie from './components/Movies/Movie';
import TvShow from './components/TvShow/TvShow';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';

import { useState , useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import Footer from './components/Footer/Footer';
import MovieDetails from './components/MovieDetails/MovieDetails';
import TvDetails from './components/TvDetails/TvDetails';

export default function App() {

    let navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
     if(localStorage.getItem('userToken')){
        getUserData();
     }
    }, []);

    useEffect(() => {
        console.log(userData);
       }, [userData]);
    

    let getUserData = ()=>
    {
        let decodedToken = jwtDecode(localStorage.getItem("userToken"));
        setUserData(decodedToken);
        console.log("tsts" ,decodedToken);
       // console.log(userData);
    }

    let logOut=()=>
    {
        localStorage.removeItem("userToken");
        setUserData(null);
        console.log("helloooooo");
        navigate('/login');
    }

    function ProtectedRoute({children})
    {
        if(!localStorage.getItem('userToken'))
        {
            return <Navigate to='/login'/>
        }
        else
        {
            return children;
        }
    }

  return (
    <>
       <Navbar logOut={logOut}/>
       <div className='container'>
            <Routes>
                <Route path='/' element={<ProtectedRoute><Home/> </ProtectedRoute>} />
                <Route path='home' element={<ProtectedRoute><Home/> </ProtectedRoute>} />
                <Route path='movies' element={<ProtectedRoute><Movie/></ProtectedRoute>} />
                <Route path='tvshow' element={<ProtectedRoute><TvShow/></ProtectedRoute> }/>
                <Route path='login' element={<Login/> }/>
                <Route path='register' element={<Register/> }/>
                <Route path='*'   element={<Notfound/>}/>

                <Route path='moviedetails' element ={<MovieDetails/> } >
                    <Route path=':id'  element ={<MovieDetails/> } />
                </Route>
                <Route path='tvdetails' element ={<TvDetails/> } >
                    <Route path=':id'  element ={<TvDetails/> } />
                </Route>
            </Routes>
       </div>
       <Footer/>
    </>
  )
}
