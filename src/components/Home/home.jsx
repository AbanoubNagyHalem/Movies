import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [tv, setTv] = useState([]);
  const [movie, setMovie] = useState([]);

  async function movieApi() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/week?api_key=44f1f80237012774946ba3a2fbbce7a1"
    );
    setMovie(data.results);
  }

  async function tvApi() {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/week?api_key=44f1f80237012774946ba3a2fbbce7a1"
    );
    setTv(data.results);
  }

  useEffect(() => {
    movieApi();
    tvApi();
  }, []);

  return (
    <>
      {movie.length > 0 && tv.length > 0 ? (
        <>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-4 d-flex align-items-center">
                <div className="title">
                  <h3>Trending Movie To Watch</h3>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet consectetur adipisicing
                  </p>
                </div>
              </div>
              {movie.map((movie, idx) => (
                <div key={idx} className="col-md-2">
                  <Link to={`/moviedetails/${movie.id}`}>
                    <div className="movie">
                      <img
                        className="w-100"
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt=""
                      />
                      <h5>{movie.title}</h5>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="row align-items-center">
              <div className="col-md-4 ">
                <div className="title">
                  <h3>Trending tv To Watch</h3>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet consectetur adipisicing
                  </p>
                </div>
              </div>
              {tv.map((tv, idx) => (
                <div key={idx} className="col-md-2">
                  <Link to="/moviedetails">
                    <div className="movie">
                      <img
                        className="w-100"
                        src={`https://image.tmdb.org/t/p/original/${tv.poster_path}`}
                        alt=""
                      />
                      <h5>{tv.name}</h5>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-spinner fa-5x fa-spin text-white"></i>
          </div>
        </>
      )}
    </>
  );
}
