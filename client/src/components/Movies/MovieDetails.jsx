import { useNavigate, useParams } from "react-router-dom"
import useHook from "../useHooks/useHooks"
import  './Style.css'



const MovieDetails  = () => {
const params  = useParams()
const { movies, baseURL, error, isPending} = useHook()
const movie = movies.find((movie) => movie._id  === params.id)
const router = useNavigate()

const handleDelete = async () => {
    try {
    const res = await fetch(`http://localhost:3001/api/movies/${params.id}` , {
        method: "DELETE"
    })
    const data = await res.json()
    console.log(data)
    router("/") 
    } catch (error) {
       console.log(error) 
    }
}

if(!movie) return "Loading.."


    return (
      <>
        <h1>{movie.name}</h1>
        <img className="img img-cover"  src={`${baseURL}${movie?.fileImage}`} alt={movie.name} />
        <button onClick={handleDelete}>Delete</button>
      </>
      
    )
}

export default MovieDetails