import { useEffect, useState } from "react";




const useHook = () => {
    const [movies, setMovies] = useState([]);
    const baseURL = process.env.REACT_APP_API
    const urlAPI  = process.env.REACT_APP_API_URL
     const [error, setError] =useState(null)
     const [isPending, setIsPending] =useState(true)
  
    const fetchData = async () => {
      try {
        const res = await fetch(`${urlAPI}movies`);
        const data = await res.json();
         console.log(data)
         setMovies(data)
         setIsPending(false)
         setError(null)
      } catch (error) {
        setError(error.message);
        setIsPending(false)
      }
  
    };
  
  
    useEffect(() => {
    fetchData()
    }, [])

    return {
        movies, baseURL, error, isPending
    }
}

export default useHook