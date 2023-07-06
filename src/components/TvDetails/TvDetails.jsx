import React from 'react';
import axios from 'axios';
import { useParams  } from "react-router-dom";
import { useState , useEffect } from 'react';

export default function TvDetails() {
  let params = useParams();
  const [movie, setMovie] = useState({});
  const [genres, setgenres] = useState([])

  useEffect(() => {
    getMovie();
  }, []);
  
  useEffect(() => {
    setgenres(movie.genres);
    // console.log(genres)
  }, [movie])
  

  async function getMovie()
  {
    let {data} = await axios.get(`https://api.themoviedb.org/3/tv/${params.id}?api_key=f1aca93e54807386df3f6972a5c33b50`);
    // console.log(data);
    setMovie(data);
  }
  return (
    <>
      {movie? <div className="row my-5 g-5">
        <div className="col-md-4">
            <img className='w-100' src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt="" />
        </div>

        <div className="col-md-8 details">
            <h1 className='pt-4'>{movie.title? movie.title  :movie.name}</h1>
            <p className="border-0">{movie.tagline}</p>
            <div className='genres d-flex flex-wrap'>
              {genres? genres.map((g, index)=>{
                return <div key={index} className='rounded-2 p-1 me-4 mb-2'>{g.name}</div>
              }) : ''}
            </div>
            <h5 className='my-2'>Rate : <span>{movie.vote_average}</span></h5>
            <h5 className='my-2'>vote count : <span>{movie.vote_count}</span></h5>
            <h5 className='my-2'>popularity : <span>{movie.popularity}</span></h5>
            <h5 className='my-2'>release date : <span>{movie.first_air_date}</span></h5>
            <h5 className='my-2'>production countries : {movie.production_countries?<span>{movie.production_countries[0].name}</span>:''}</h5>
            <h5 className='text-center mt-5'>overview</h5>
            <p className="border-0 mt-1">{movie.overview}</p>
        </div>
        
      </div> : <div className=" d-flex justify-content-center align-items-center"> <h2><i className='fas fa-spinner fa-spin'></i></h2> </div>}
    </>
  )
}
