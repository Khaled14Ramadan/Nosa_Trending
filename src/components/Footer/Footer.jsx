import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {

  let facebook = ()=> {
    window.open(`https://www.facebook.com/khaled14ramadan`, '_blank');
  }
  let youtube = ()=> {
    window.open(`https://www.youtube.com/channel/UCWlgAi4SrmbsKoFGSNpxH2g`, '_blank');
  }
  let linkedin = ()=> {
    window.open(`https://www.linkedin.com/in/khaled-ramadan-978a14168`, '_blank');
  }
  let gitHub = ()=> {
    window.open(`https://github.com/Khaled14Ramadan`, '_blank');
  }

  return (
    <>
    <div className="p-4 d-flex flex-column align-items-center justify-content-center ">
        <ul className="d-flex list-unstyled ">
            
            <li><Link  to='home'><i className="fas fa-home"></i></Link></li>
            <li><Link onClick={facebook} to = ''><i className='fab mx-2 fa-facebook'></i></Link></li>
            <li><Link onClick={youtube} to = ''><i className='fab mx-2 fa-youtube'></i></Link></li>
            <li><Link onClick={linkedin}  to = ''><i className="fab fa-linkedin mx-2"></i></Link></li>
            <li><Link  onClick={gitHub}  to = ''><i className='fab mx-2 fa-github'></i></Link></li>
        </ul>
        <div className="foot">&copy; 2022 <span>Nosa </span> All Movies and TV Trending</div>
    </div>
    </>
  )
}
