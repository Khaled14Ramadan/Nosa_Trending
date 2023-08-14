import axios from "axios";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import ".//Home.css";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { MyContext } from "../../DataCenter/MyProvider";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [showMOvie, setShowMOvie] = useState(false);
  const [showTV, setShowTV] = useState(false);
  const { searchInput: searchValue } = useContext(MyContext);

  useEffect(() => {
    getMovies();
    getTv();

    return () => {};
  }, []);

  useEffect(() => {
    //becouse useState is asyncrounce but it not work with promise or awiat or callback
    console.log("movies : ", movies);
    // console.log(tv);
  }, [movies, tv]);

  let getMovies = async () => {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=f1aca93e54807386df3f6972a5c33b50"
    );
    setMovies(data.results);
    //console.log(movies);
  };

  let getTv = async () => {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=f1aca93e54807386df3f6972a5c33b50"
    );
    setTv(data.results);
    //console.log(movies);
  };

  let moreShowMovie = () => {
    let states = true;
    setShowMOvie(states);
  };
  let lessShowMovie = () => {
    let states = false;
    setShowMOvie(states);
  };
  let moreShowTv = () => {
    let states = true;
    setShowTV(states);
  };
  let lessShowTv = () => {
    let states = false;
    setShowTV(states);
  };

  return (
    <>
      <div className="row my-5 g-3">
        <div className="col-md-4 col-sm-6 col-8">
          <div className="content">
            <h2>
              Trending
              <br /> Movies <br />
              to Watch now
            </h2>
            <p className=" py-4">Most watched movies by week</p>
          </div>
        </div>
        {movies.length ? (
          movies.map((movie, index) => {
            if (
              index >= 10 &&
              (searchValue === "" || searchValue === null) &&
              !showMOvie
            ) {
              return "";
            }

            if (
              searchValue == null ||
              movie.title.toUpperCase().includes(searchValue.toUpperCase())
            ) {
              return (
                <div key={index} className="col-md-2 col-sm-3 col-4">
                  <div className="movie">
                    <Link to={`/moviedetails/${movie.id}`}>
                      <img
                        className="w-100"
                        src={
                          "https://image.tmdb.org/t/p/w500" + movie.poster_path
                        }
                        alt=""
                      />
                      <h6 className="pt-1 text-center">
                        {movie.original_title}
                      </h6>
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </Link>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div className="col-md-8 col-sm-6 d-flex justify-content-center align-items-center">
            {/* {" "}
            <h2>
              <i className="fas fa-spinner fa-spin"></i>
            </h2>{" "} */}
            <LoaderSpinner />
          </div>
        )}
      </div>
      {/* button to show more movies */}
      {movies.length > 10 && (
        <div className="d-flex justify-content-center">
          {showMOvie ? (
            <button onClick={lessShowMovie} className="btn btn-outline-info">
              Show Less
            </button>
          ) : (
            <button onClick={moreShowMovie} className="btn btn-outline-info">
              Show More
            </button>
          )}
        </div>
      )}

      {/* this to show the TV show */}
      <div className="row my-5 g-3">
        <div className="col-md-4 col-sm-6 col-8">
          <div className="content">
            <h2>
              Trending
              <br /> Tv <br />
              to Watch now
            </h2>
            <p className=" py-4">Most watched Tvshow by week</p>
          </div>
        </div>
        {tv.length ? (
          tv.map((movie, index) => {
            if (
              index >= 10 &&
              (searchValue === "" || searchValue === null) &&
              !showTV
            ) {
              return "";
            }
            if (
              searchValue == null ||
              movie.name.toUpperCase().includes(searchValue.toUpperCase())
            ) {
              return (
                <div key={index} className="col-md-2 col-sm-3 col-4">
                  <div className="movie">
                    <Link to={`/tvdetails/${movie.id}`}>
                      <img
                        className="w-100"
                        src={
                          "https://image.tmdb.org/t/p/w500" + movie.poster_path
                        }
                        alt=""
                      />
                      <h6 className="pt-1 text-center">{movie.name}</h6>
                      <span>{movie.vote_average.toFixed(1)}</span>
                    </Link>
                    {/* {root. style. setProperty('--rate' , `${movie.vote_average}`)} */}
                  </div>
                </div>
              );
            } else {
              return "";
            }
          })
        ) : (
          <div className="col-md-8 col-sm-6 d-flex justify-content-center align-items-center">
            <LoaderSpinner />
          </div>
        )}
      </div>
      {/* button to show more movies */}
      <div className="d-flex justify-content-center">
        {showTV ? (
          <button onClick={lessShowTv} className="btn btn-outline-info">
            Show Less
          </button>
        ) : (
          <button onClick={moreShowTv} className="btn btn-outline-info">
            Show More
          </button>
        )}
      </div>
    </>
  );
}
