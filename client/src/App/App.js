import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import FormPage from "../pages/FormPage/FormPage";
import Nav from "../components/Nav/Nav";
import MovieDetails from "../components/Movies/MovieDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<FormPage />} />
            <Route  path="/movie/:id" element={<MovieDetails />}/>
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
