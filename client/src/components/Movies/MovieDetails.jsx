import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useHook from "../useHooks/useHooks"
import useMutations from "../useMutations/useMutations"
import MovieItemDetails from "./MovieItemDetails"
import './Style.css'


const MovieDetails = () => {
  const params = useParams();
  const { handleDelete,  handleLikes,  handleComments, formData, setFormData, error, isPending } = useMutations();
  const { movies, baseURL } = useHook();
  const movie = movies.find((movie) => movie._id === params.id);
 

   


 
  

  

  return (
    <>
      <div>{isPending && "Loading..."}</div>
       <div>{error && <p>{error.message}</p>}</div>
      {movie && <MovieItemDetails movie={movie} handleLikes={handleLikes}  baseURL={baseURL} />}
      <button onClick={handleDelete}>Delete</button>
      <div>
      <h2>Comments:</h2>
      {movie && movie.comments.map((comment, index) => (
        <p key={index}>{comment}</p>
      ))}
      <form onSubmit={handleComments}>
         <label>
          Add a comment:
          <input type="text" value={formData.comment} onChange={(e) =>  setFormData({ ...formData, comment: e.target.value }) }  />
        </label>
        <button>Submit</button>
      </form>
    </div>
    </>
  );

}

export default MovieDetails