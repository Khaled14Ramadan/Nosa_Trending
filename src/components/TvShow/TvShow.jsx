import axios from "axios";
import React, { useCallback, useContext } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../DataCenter/MyProvider";
import axiosApi from "../AxiosApi/AxiosApi";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

export default function TvShow() {
  const [tv, setTv] = useState([]);
  const { searchInput: searchValue, notify } = useContext(MyContext);

  useEffect(() => {
    getTv();
  }, []);

  //   let getTv = async () => {
  //     let { data } = await axios.get(
  //       "https://api.themoviedb.org/3/trending/tv/day?api_key=f1aca93e54807386df3f6972a5c33b50"
  //     );
  //     setTv(data.results);
  //     //console.log(movies);
  //   };

  const getTv = async () => {
    try {
      const { data } = await axiosApi.get(`tv/day?page=1`);
      //   console.log(data);
      setTv(data.results);
    } catch (e) {
      //   console.log("error", e.message);
      notify(e.message, "error");
    }
  };

  return (
    <>
      {/* this to show the TV show */}
      <div className="row my-5 g-3">
        <div className="col-md-4 col-sm-6 col-8">
          <div className="content">
            <h2>
              Trending
              <br /> Tv <br />
              to Watch now
            </h2>
            <p className=" py-4">Most watched Tvshow by day</p>
          </div>
        </div>
        {tv.length ? (
          tv.map((movie, index) => {
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
    </>
  );
}
