import axios from 'axios';
import React from 'react'
import { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TvShow() {
    const [tv, setTv] = useState([]);

    useEffect(() => {
        getTv();
    }, []);

    let getTv = async()=> {
        let {data} = await axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=f1aca93e54807386df3f6972a5c33b50');
        setTv(data.results);
        //console.log(movies);
    }

  return (
    <>
        {/* this to show the TV show */}
    <div className="row my-5 g-3">
        <div className="col-md-4 col-sm-6 col-8">
            <div className="content">
                <h2>Trending<br/> Tv <br/>to Watch now</h2>
                <p className=' py-4' >Most watched Tvshow by day</p>
            </div>
        </div>
        {tv? tv.map((movie , index)=> {
            return <div key={index} className="col-md-2 col-sm-3 col-4">
            <div className="movie">
                <Link to ={`/tvdetails/${movie.id}`}>
                    <img className='w-100' src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path} alt="" />
                    <h6 className='pt-1 text-center'>{movie.name}</h6>
                    <span>{movie.vote_average}</span>
                </Link>
            </div>
        </div>
        }) :<div className="col-md-8 col-sm-6 d-flex justify-content-center align-items-center"> <h2><i className='fas fa-spinner fa-spin'></i></h2> </div>}
    </div>
    </>
  )
}
