import { useCookies } from "react-cookie"
import { Link, useParams } from "react-router-dom"
import "./Style.css"
import { useState } from "react";


const Nav = ({removeCookieToken}) => {
const [cookies] = useCookies(["user"])



    return (
        <div className="nav">
           <Link to={"/"}>Home</Link>
           <Link to={"/form"}>Form</Link>
           <Link to={`/profile/${cookies.user}`}>Profile</Link>
           <button onClick={removeCookieToken}>Log out</button>
        </div>
    )
}

export default Nav