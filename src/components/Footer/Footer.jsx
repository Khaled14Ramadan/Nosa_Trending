import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
    <div className="p-4 d-flex flex-column align-items-center justify-content-center ">
        <ul className="d-flex list-unstyled ">
            
            <li><Link  to='home'><i className="fas fa-home"></i></Link></li>
            <li><a  href='https://www.facebook.com/khaled14ramadan'><i className='fab mx-2 fa-facebook'></i></a></li>
            <li><a  href='https://www.youtube.com/channel/UCWlgAi4SrmbsKoFGSNpxH2g'><i className='fab mx-2 fa-youtube'></i></a></li>
            <li><a  href='https://www.instagram.com/'><i className='fab mx-2 fa-instagram'></i></a></li>
            <li><a  href='https://www.spotify.com/eg-ar/'><i className='fab mx-2 fa-spotify'></i></a></li>
        </ul>
        <div className="foot">&copy; 2022 <span>Nosa </span> All Movies and TV Trending</div>
    </div>
    </>
  )
}
