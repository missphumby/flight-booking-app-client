// Login Page

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "../styles/register-login.css";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    const url = "http://localhost:5000";
    fetch(`${url}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginUsername,
        password: loginPassword,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("resss", res);

        if (res.message === "Authorization failed") {
          toast.info("Unauthorized User, please enter a valid email address");
          console.log(res.message);
        } else if (res.error) {
          toast.error("Incorrect password, please enter a valid password");
        } else if (res.token) {
          const { _id } = res.user;
          localStorage.setItem("id", _id);
          localStorage.setItem("token", res.token);
          localStorage.setItem("checkedItems", res.user.checkedItems);
          if (res.user.flightBooked == true && res.user.hotelBooked == false) {
            window.location.href = "./exploreHotels";
          } else if (
            res.user.flightBooked == true &&
            res.user.hotelBooked == true &&
            res.user.fun == true
          ) {
            window.location.href = "./exploreFun";
          } else {
            // toast.success("Login successful");
            window.location.href = "./explore";
          }
        }
      });
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "#003060",
          padding: "3%",
          marginBottom: "-5%",
        }}
      >
        <form className="login" onSubmit={login}>
          <h1 style={{ fontSize: "4rem" }}>Login 🏕️</h1>
          <br />
          <input
            placeholder="Email ID"
            onChange={(e) => setLoginUsername(e.target.value)}
            className="input-box"
            type="email"
            required
          />
          <br />
          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setLoginPassword(e.target.value)}
            className="input-box"
            required
          />
          <br />

          <button className="otherbuttons" type="submit">
            Continue
          </button>
          <br />

          <br />
          <div style={{ fontSize: "medium" }}>Don't have an account yet? </div>
          <Link to={"/register"}>
            <h1 className="sign-up-text btn btn-primary">Sign Up Now!</h1>
          </Link>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        autoClose={false}
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={false}
      />
    </div>
  );
}
