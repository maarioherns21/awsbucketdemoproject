import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import FormPage from "../pages/FormPage/FormPage";
import Nav from "../components/Nav/Nav";
import MovieDetails from "../components/Movies/MovieDetails";
import { useState } from "react";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import useToken from "../components/useToken/useToken";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

function App() {
const {token , setToken, removeCookieToken} =useToken()

  if (token) {
    return (
      <div className="App">
        <BrowserRouter>
          <Nav removeCookieToken={removeCookieToken} />
          <header className="App-header">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/form" element={<FormPage />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/profile/:id" element={<ProfilePage token={token} />}/>
              <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
          </header>
        </BrowserRouter>
      </div>
    );
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <header className="App-header">
          <Routes>
            <Route path="/register" element={<RegisterPage setToken={setToken} />} />
            <Route path="/login" element={<LoginPage  setToken={setToken}/>} />
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
