import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useHook from "../useHooks/useHooks";





const Movies = () => {
const { movies, baseURL, error, isPending} = useHook()

const loading = <p>"Loading..."</p>

  return (
    <div>
        <div>{error && <h2>{error}</h2>}</div>
        {movies?.map((movie) => (
            <div key={movie._id}>
              <Link to={`/movie/${movie._id}`}>
              <h2>{movie.name}</h2>
              {!isPending ? (<>
              <img  fetchpriority="high" src={`${baseURL}${movie?.fileImage}`} alt={movie.name} style={{ height: "420px" , width:" 320px"}} />
              </>) : (
               <>
                {loading}
               </>
              )  }
              </Link>
            </div>
        ))}
    </div>
  )
};

export default Movies
