import React, { useEffect, useState } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import Explore from "./Pages/Explore";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Explore2 from "./Pages/ExploreHotels";
import Explore3 from "./Pages/ExploreFun";
import jwtDecode from "jwt-decode";
import NavbarComp from "./components/navbar";
import UserNav from "./components/userNavbar";
import { ToastContainer } from "react-toastify";
function App() {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setUser(user);
      console.log(user);
    } catch (ex) {}
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location = "./login";
  };
  return (
    <div>
      <ToastContainer />
      {!user ? (
        <NavbarComp user={user} />
      ) : (
        <UserNav logout={logout} name={user.username} user={user} />
      )}
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/explore" exact component={Explore} />
        <Route path="/exploreHotels" exact component={Explore2} />
        <Route path="/exploreFun" exact component={Explore3} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </BrowserRouter>
    </div>
  );
}

export default App;
