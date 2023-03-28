import { useState } from "react";
import "./Style.css"
import axios from "axios"
import {useNavigate} from "react-router-dom"



const FormPage = () => {
  const [data, setData] = useState({ name: "", creator: "mario", body: "", fileImage: "" });
  const [isLoading, setIsloading] =useState(false)
  const [error, setError] =useState(null)
  const router = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
    setIsloading(true)
    let formData = new FormData();
    formData.append("photo", data.fileImage);
    formData.append("name" , data.name)
    formData.append("creator" , data.creator)
    formData.append("body" , data.creator)
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    await axios.post(`${process.env.REACT_APP_API_URL}movies/add`, formData, config);
    console.log(formData)
    router("/")
    setError(null);
    setIsloading(false)
    } catch (error) {
        setError(error.message);
        setIsloading(false)
    }
  } 


  return (
    <div className="form">
      <div>{error && <h1>{error}</h1>}</div>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          name="name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <textarea
          name="body"
          onChange={(e ) => setData({ ...data, body: e.target.value })}
        />
        <select name="creator" onChange={(e) => setData({...data, creator: e.target.value})}>
          <option value={"mario"}>Mario</option> 
          <option  value={"mark"}>Mark</option>
        </select>
        <input
         type="file"
         name="photo"
         onChange={(e) => setData({...data, fileImage: e.target.files[0] })}
        />
        <button>{isLoading ? "Loading.." : "Submit"}</button>
      </form>
    </div>
  );
};

export default FormPage;
