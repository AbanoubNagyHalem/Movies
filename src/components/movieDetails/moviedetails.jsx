import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Moviedetails() {
  let { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});

  async function getMovieDetails() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=44f1f80237012774946ba3a2fbbce7a1&language=en-US`
    );

    setMovieDetails(data);
  }

  console.log(movieDetails);

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col md-4">
            <div className="myImage">
              <img
                className="w-100"
                src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
                alt=""
              />
            </div>
          </div>
          <div className="col md-8">
            <h3>{movieDetails.original_title}</h3>
            <p>{movieDetails.overview}</p>
            {movieDetails.genres?.map((genre, idx) => (
              <span key={idx} className="me-2 p-2 bg-info text-white">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
