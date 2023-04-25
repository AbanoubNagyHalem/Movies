import Navbar from "./components/Navbar/navbar";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Home from "./components/Home/home";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import Movies from "./components/Movies/movies";
import Tv from "./components/Tv/tv";
import Moviedetails from "./components/movieDetails/moviedetails";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

function App() {
  console.log("hi");
  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  function decodeToken() {
    try {
      let user = jwtDecode(localStorage.getItem("tkn"));
      setCurrentUser(user);
      console.log( user);
    } catch (error) {
      let user = {}
      console.log(error);
    }
   
  
  }

  function clearUser() {
    localStorage.removeItem("tkn");
    setCurrentUser(null);
    navigate("/login");
  }

  function Testing(props) {
    if (localStorage.getItem("tkn") == null) {
      return <Navigate to="/login" />;
    } else {
      return props.children;
    }
  }

  useEffect(() => {
    if (localStorage.getItem("tkn") != null) {
      decodeToken();
      console.log(localStorage.getItem("tkn"));
    }
  }, []);

  return (
    <>
      <Navbar currentUser={currentUser} clearUser={clearUser} /> 

      <Routes>
        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route
          path="movies"
          element={
            <Testing>
              <Movies />
            </Testing>
          }
        />
        <Route
          path="tv"
          element={
            <Testing>
              <Tv />
            </Testing>
          }
        />

        <Route path="moviedetails" element={<Moviedetails />}>
          <Route path=":id" element={<Moviedetails />} />
        </Route>

        <Route path="login" element={<Login decodeToken={decodeToken} />} />
        <Route path="register" element={<Register />} />
        <Route
          path="*"
          element={
            <div className="vh-100 d-flex align-items-center justify-content-center">
              <h1>4 0 4</h1>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
