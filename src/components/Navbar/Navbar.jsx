import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../DataCenter/MyProvider";

export default function Navbar({ logOut }) {
  const { updateSearch, notify } = useContext(MyContext);

  const search = (e) => {
    updateSearch(e.target.value);
  };
  const logOuthandle = () => {
    notify("Successfully logged out", "success");
    logOut();
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top mb-4">
        <div className="container">
          <Link className="navbar-brand fw-bolder" to="/">
            Nosa
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {localStorage.getItem("userToken") ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="home">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="movies">
                      Movies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="tvshow">
                      TvShow
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!localStorage.getItem("userToken") ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link onClick={logOuthandle} className="nav-link" to="login">
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>

          <div className="d-flex  ms-auto">
            <button
              className="navbar-toggler mx-2 ms-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {localStorage.getItem("userToken") ? (
              <>
                {" "}
                {/*to show the search icon and text after login */}
                <div className="collapse" id="collapseWidthExample">
                  <div className="tstsSearch ">
                    <form role="search">
                      <input
                        className="search form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        // onKeyUp={props.searchMovie}
                        onChange={search}
                      />
                    </form>
                  </div>
                </div>
                <button
                  className="btn btn-tsts mx-2 ms-auto"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseWidthExample"
                  aria-expanded="false"
                  aria-controls="collapseWidthExample"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>{" "}
                  {/* this search icon */}
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
