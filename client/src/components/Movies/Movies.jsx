import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useHook from "../useHooks/useHooks";
import  './Style.css'



const Movies = () => {
const { movies, baseURL, error, isPending} = useHook()

const loading = <p>"Loading..."</p>


  return (
    <>
        <div>{error && <h2>{error}</h2>}</div>
        {movies?.map((movie) => (
            <div key={movie._id}>
              <Link to={`/movie/${movie._id}`}>
              <h2 className="text">{movie.name}</h2>
              {!isPending ? (<>
              <img  className="img img-cover" fetchpriority="high" src={`${baseURL}${movie?.fileImage}`} alt={movie.name}  />
              </>) : (
               <>
                {loading}
               </>
              )  }
              </Link>
            </div>
        ))}
    </>
  )
};

export default Movies
