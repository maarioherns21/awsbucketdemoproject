import { Link } from "react-router-dom"
import "./Style.css"


const Nav = () => {

    return (
        <div className="nav">
           <Link to={"/"}>Home</Link>
           <Link to={"/form"}>Form</Link>
        </div>
    )
}

export default Nav