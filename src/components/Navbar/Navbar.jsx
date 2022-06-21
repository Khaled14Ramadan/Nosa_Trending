import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
   
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bolder" to="home">Nosa</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li> */}

                        {/* <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                        </li> */}
                        {/* <li className="nav-item">
                        <a className="nav-link disabled">Disabled</a>
                        </li> */}
                        {localStorage.getItem('userToken') ? <>
                            <li className="nav-item">
                                <Link className="nav-link" to="home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="movies">Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="tvshow">TvShow</Link>
                            </li>
                        </>:''}
                    </ul>
                    {/* <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}

                    
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                       {!localStorage.getItem('userToken') ? <>
                            <li className="nav-item">
                                <Link className="nav-link" to="login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="register">Register</Link>
                            </li>
                       </>:<li className="nav-item">
                                <Link  onClick={props.logOut} className="nav-link" to="login">Logout</Link>
                            </li>}
                        
                    </ul>
                </div>
            </div>
    </nav>
    </div>
  )
}
