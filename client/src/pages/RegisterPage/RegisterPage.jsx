import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import Cookies  from "js-cookie"


const RegisterPage = () => {
    const [data, setData] =useState({ username: "" ,email: "", password: "" ,  bio: "" , fileImage:""})
    const [error, setError] =useState(null)

    const handleSubmit = async (e) => {
      e.preventDefault();
      //    setToken(data)
      try {
        // const token = {...data}
        let formData = new FormData();
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("bio", data.bio);
        formData.append("photo", data.fileImage);
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const res = await axios.post(`http://localhost:3001/api/user/register`,
          formData,
          config
        );
        const data1 = res.data
        console.log(data1)
        if (data1) {
            Cookies.set("token", data.token, { expires: 7 });
            Cookies.set("user", JSON.stringify(data.user.id), { expires: 7 });
            console.log(data1.user)
            setError(null);
          } else {
            setError(data1.message);
          }
        }

         catch (error) {
            console.log(error.message)
            setError(error.message);
        }
      }
    
    
        return (
          <> 
          <h2>Register Form</h2>
            <form className="form" onSubmit={handleSubmit}>
              <input type="text" name="username"  onChange={(e) => setData({...data , username: e.target.value})} />
              <input name="email" onChange={(e) => setData({...data , email: e.target.value})} />
              <input name="password"  onChange={(e) => setData({...data, password: e.target.value })}/>
              <textarea type="text" name="bio" onChange={(e) => setData({...data , bio: e.target.value})} />
              <input type="file" name="photo" onChange={(e) => setData({...data , fileImage: e.target.files[0]})} />
              <button>Submit</button>
            </form>
            <Link to={"/login"}>
              Login
            </Link>
          </>
        );
}

export default  RegisterPage