import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useMutations = () => {
  const params = useParams();
  const router = useNavigate();
  const [formData, setFormData] = useState({ like: "", comment: "" });
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  // const [likes, setLikes] = useState([]);
  // const [comments, setComments] = useState([]);

  ////-----------delete handlefunction-----//

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/movies/${params.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      setError(null);
      setIsPending(false);
      router("/");
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  ////-----------like handlefunction-----//
  const handleLikes = async (e) => {
    e && e.preventDefault &&  e.preventDefault();
    try {
      const like = { ...formData };
      const res = await fetch(`http://localhost:3001/api/movies/${params.id}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(like),
      });
      const data = await res.json();
      console.log(data);
      setError(null);
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };



 ////-----------comments  handlefunction-----//
  
  const handleComments = async (e) => {
  e && e.preventDefault &&  e.preventDefault();
    try {
      const comment = { ...formData };
      const res = await fetch(`http://localhost:3001/api/movies/${params.id}/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(comment),
        });
      const data = await res.json();
      console.log(data);
      setError(null);
      setIsPending(false);
      setFormData({ ...formData, comment: "" });
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };


  return {
    handleDelete,
    handleLikes,
    handleComments,
    error,
    isPending,
    formData,
    setFormData,
  };
};

export default useMutations;
