import React, { useCallback, useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import axiosApi from "../AxiosApi/AxiosApi";
import { MyContext } from "../../DataCenter/MyProvider";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [moviesShow, setMoviesShow] = useState([]);
  const [currentNumPage, setCurrentNumPage] = useState(1);
  const { searchInput: searchValue } = useContext(MyContext);

  useEffect(() => {
    getMovies();
    return () => console.log("movie component dead !!");
  }, [currentNumPage]);

  useEffect(() => {
    if (movies.length) {
      const newList = movies.filter(
        (movie) =>
          movie.title.toUpperCase().includes(searchValue?.toUpperCase()) ||
          !searchValue
      );
      setMoviesShow(newList);
    }
  }, [searchValue, movies]);

  const getMovies = useCallback(async () => {
    try {
      const { data } = await axiosApi.get(`movie/day?page=${currentNumPage}`);
      setMovies(data.results);
      console.log(data);
    } catch {
      console.log("error");
    }
  }, [currentNumPage]);

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
            <p className=" py-4">Most watched movies by day</p>
          </div>
        </div>
        {movies.length ? (
          moviesShow.map((movie, index) => {
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
                    <h6 className="pt-1 text-center">{movie.title}</h6>
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-md-8 col-sm-6 d-flex justify-content-center align-items-center">
            <LoaderSpinner />
          </div>
        )}

        <button
          onClick={() => setCurrentNumPage((prev) => ++prev)}
          className="btn btn-outline-info"
        >
          Next Page
        </button>
      </div>
    </>
  );
};

export default Movie;
