import Cookies from "js-cookie"
import { useState } from "react"
import { Link } from "react-router-dom"
// import "./Style.css"




const LoginPage = () => {
const [formData, setFormData] =useState({ email: "", password: ""})
const [error, setError] =useState(null)

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = { ...formData };
    const res = await fetch("http://localhost:3001/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(token),
    });
    const data = await res.json();
    console.log(data);
    if (data) {
      Cookies.set("token", data.token, { expires: 7 });
      Cookies.set("user", JSON.stringify(data.user.id), { expires: 7 });
      console.log(data.user);
      setError(null);
    } else {
      setError(data.message);
    }

  } catch (error) {
    console.log(error.message);
    setError(error.message);
  }
};

    return (
      <>
      <div>{error && <p>{error}</p>}</div>
         <h2>Login Form</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input value={formData.email} onChange={(e) => setFormData({...formData , email: e.target.value})} />
          <input value={formData.password}  onChange={(e) => setFormData({...formData, password: e.target.value })}/>
          <button>Submit</button>
        </form>
        <Link to={"/register"}>
         Register 
        </Link>
      </>
    );
}

export default LoginPage