import { useState, useEffect } from "react";
import Cookies from "js-cookie";


const useToken = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const setCookieToken = (token) => {
    Cookies.set("token", token, { expires: 7 });
    setToken(token);
  };

  const removeCookieToken = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setToken("");
  };
  

  return {
    token,
    setCookieToken,
    removeCookieToken,
  };
};

export default useToken;