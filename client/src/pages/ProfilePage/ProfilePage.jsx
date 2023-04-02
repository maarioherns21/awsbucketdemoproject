
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";



const ProfilePage = ({token }) => {
    const params = useParams();
    const [error, setError] =useState(null)
    const [data, setData] =useState([])

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/user/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data1 = res.data
        setData(data1)
        setError(null)
        console.log(data1)
        }
       catch (error) {
        console.log(error.message);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

  
    return (
        <>
        <div>{error && <p>{error}</p>}</div>
        <h1>{data.username}</h1>
        </>
    );
  };


export default ProfilePage;

  
