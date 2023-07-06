import axios from 'axios';
import React from 'react'
import { useState , useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {

    let navigate = useNavigate();
   
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        "email":'',
        "password":''
    });

    useEffect(() => {
    // console.log(user);
    }, [user])
    

    //function to change userData after enter any input
    let getUser = (e)=> {
        let myUser = {...user};
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
    }
    // submit function
    let submitLogin = async(e)=>{
        e.preventDefault();
        setLoad(true);
      
        let {data} = await axios.post(`https://route-egypt-api.herokuapp.com/signin` , user);
        console.log(data);
        setLoad(false);
        if(data.message=== 'success')
        {
            //Navigate to login   
            localStorage.setItem("userToken", data.token);
            navigate('/Home');

        }
        else
        {
            console.log("error respon");
            setError(data.message);
        }

        
    }

   

  return (
    <>
     <h2 className='text-center my-4'>Login</h2>
    {error?<div className='alert alert-danger'>incorrect email or password</div>:''}
    {load?<div className='overlay2'></div>:''}
     <form className='m-auto vh-100' onSubmit={submitLogin}>

        <label htmlFor="email" className='mt-4 mb-2'> Email:</label>
        <input onChange={getUser} type="email" className='form-control  my-1' name='email' id='email' />
       
        <label htmlFor="password " className='mt-4 mb-2'> Password:</label>
        <input onChange={getUser} type="password" className='form-control  my-1' name='password' id='password' />

        <div className='d-flex justify-content-between align-items-ceneter'>
            <button type='supmit' className='btn btn-outline-info my-4'>
                {load?<i className='fas fa-spinner fa-spin'></i>: 'Login'}
            </button>
            <div className='py-4' >don't have account ?<Link to='register' className='text-decoration-underline' > Register</Link></div>
        </div>
    </form> 
    </>
  )
}
