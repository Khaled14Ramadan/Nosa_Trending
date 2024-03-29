import axios from 'axios';
import Joi from 'joi';
import React from 'react'
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    let navigate = useNavigate();
    const [errorListResgister, setErrorListResgister] = useState([]);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        "first_name":'',
        "last_name":'',
        "age":0 ,
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

    let validationinput=()=>
    {
        let validationResult = validationRegister(user);
        //console.log(validationResult.error.details);
        if(validationResult.error)
        {
            setErrorListResgister(validationResult.error.details);
        }
    }

    // submit function
    let submitRegister = async(e)=>{
        e.preventDefault();
        setLoad(true);
        let validationResult = validationRegister(user);
        //console.log(validationResult.error.details);
        if(validationResult.error)
        {
            setLoad(false);
            setErrorListResgister(validationResult.error.details);
        }
        else
        {
            setErrorListResgister([]);
            let {data} = await axios.post(`https://route-egypt-api.herokuapp.com/signup` , user);
            //console.log(data);
            setLoad(false);
            if(data.message=== 'success')
            {
                //Navigate to login   
                navigate('/Login');

            }
            else
            {
                console.log("error respon");
                setError(data.message);
            }
        }
        
    }

    //validation Register function
    let validationRegister=(x)=>
    {
        let schema = Joi.object({
            first_name : Joi.string().alphanum().min(4).max(10).required(),
            last_name : Joi.string().alphanum().min(4).max(10).required(),
            age : Joi.number().min(18).max(80).required(),
            email : Joi.string().email({minDomainSegments:2 , tlds:{allow:['com' , 'net']}}),
            password : Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,}$/) //(?=.*?[0-9])(?=.*?[#?!@$%^&*-])
        });

        return schema.validate(x , {abortEarly:false});
    }

  return (
    <>
    
     <h2 className='text-center my-4'>Register</h2>
    {error?<div className='alert alert-danger'>{error}</div>:''}
    {load?<div className='overlay2'></div>:''}
     <form className='m-auto vh-200' onSubmit={submitRegister}>
        
        <label htmlFor="first_name" className='mt-4 mb-2'> FristName:</label>
        <input onChange={getUser} onKeyUp={validationinput} type="text" className='form-control  my-1' name='first_name' id='first_name' />
        {errorListResgister.map((error , index)=>{
            if(error.message.includes("first_name"))
            {
                return (<div key={index} className='alert-danger p-2 my-2 rounded-2'>Write onley letter and numbers <br/> Min 4 characters</div>);
            }
            else
            {
                return ''
            }
        })}

        <label htmlFor="last_name" className='mt-2 mb-1'> LastName:</label>
        <input onChange={getUser} onKeyUp={validationinput} type="text" className='form-control  my-1' name='last_name' id='last_name' />
        {errorListResgister.map((error , index)=>{
            if(error.message.includes("last_name"))
            {
                return (<div key={index} className='alert-danger p-2 my-2 rounded-2'>Write onley letter and numbers <br/> Min 4 characters</div>);
            }
            else
            {
                return ''
            }
        })}

        <label htmlFor="age" className='mt-2 mb-1'> Age:</label>
        <input onChange={getUser} onKeyUp={validationinput} type="number" className='form-control  my-1' name='age' id='age' />
        {errorListResgister.map((error , index)=>{
            if(error.message.includes("age"))
            {
                return (<div key={index} className='alert-danger p-2 my-2 rounded-2'>{error.message}</div>);
            }
            else
            {
                return ''
            }
        })}

        <label htmlFor="email" className='mt-2 mb-1'> Email:</label>
        <input onChange={getUser} onKeyUp={validationinput} type="email" className='form-control  my-1' name='email' id='email' />
        {errorListResgister.map((error , index)=>{
            if(error.message.includes("email"))
            {
                return (<div key={index} className='alert-danger p-2 my-2 rounded-2'>{error.message}</div>);
            }
            else
            {
                return ''
            }
        })}
        <label htmlFor="password" className='mt-2 mb-1'> Password:</label>
        <input onChange={getUser} onKeyUp={validationinput} type="password" className='form-control  my-1' name='password' id='password' />
        {errorListResgister.map((error , index)=>{
            if(error.message.includes("password"))
            {
                return (<div key={index} className='alert-danger p-2 my-2 rounded-2'>
                * Min 1 uppercase letter.
                <br/>*Min 1 lowercase letter.
                <br/>*Min 1 special character.
                <br/>*Min 1 number.
                <br/>* Min 5 characters.</div>);
            }
            else
            {
                return ''
            }
        })}

        <button type='supmit' className='btn btn-outline-info my-4'>
            {load?<i className='fas fa-spinner fa-spin'></i>: 'Register'}
        </button>
    </form> 
    
    </>
  )
}
