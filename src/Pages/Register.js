// Register/ SignIn Page

import React, { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../styles/questions.css";

export default function Register() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerMobile, setRegisterMobile] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [trip, setTrip] = useState("");
  const [hotel, setHotel] = useState("");
  const [fun, setFun] = useState("");
  const [checked, setChecked] = useState([]);
  let checkedItems;
  const checkList = [
    { label: "water", q: "Do you like water sports" },
    { label: "night", q: "Do you like Night games/activities?" },
    { label: "site seeing", q: "Do you like site seeing?" },
    { label: "table", q: "Do you like table games?" },
    { label: "riding", q: "Do you horse riding?" },
    { label: "soccer", q: "Do you like soccer games" },
    { label: "movies", q: "Do you like movies?" },
    { label: "riding", q: "Do you like riding bikes?" },
  ];
  // let checkedItems;
  let checkedLists = document.querySelectorAll(".checked-item");
  console.log(checkedLists);
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    // checkedList.push(checkedItems);
  };

  // Generate string of checked items
  checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  console.log(checkedItems);
  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item.label) ? "checked-item" : "not-checked-item";

  const register = (e) => {
    e.preventDefault();
    const url = "http://localhost:5000";
    fetch(`${url}/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: registerUsername,
        password: registerPassword,
        mobile: registerMobile,
        email: registerEmail,
        flightBooked: trip,
        hotelBooked: hotel,
        fun: fun,
        checkedItems: checkedItems,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.message === "mail exists") {
          toast.error("Mail exists");
          return false;
        } else if (res.success) {
          toast.success("user created successfully");
          window.location.href = "./login";
        } else if (res.error) {
          console.log("error", res.err);
          toast.error(res.err);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form className="login" onSubmit={register}>
        <h1 style={{ fontSize: "4rem" }}>Register Now! ⚓</h1>
        <br />

        <input
          placeholder="Name"
          onChange={(e) => setRegisterUsername(e.target.value)}
          className="input-box"
          required
        />
        <br />

        <input
          placeholder="Mobile Number"
          onChange={(e) => setRegisterMobile(e.target.value)}
          className="input-box"
          required
        />
        <br />

        <input
          placeholder="Email ID"
          onChange={(e) => setRegisterEmail(e.target.value)}
          className="input-box"
          required
        />
        <br />

        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setRegisterPassword(e.target.value)}
          className="input-box"
          required
        />
        <div>
          <legend>Do you have a flight booked already?</legend>

          <div class="radio-btns">
            <input
              type="radio"
              id="yes"
              name="trip"
              value="yes"
              onChange={(e) => setTrip(e.target.value)}
            />
            <label htmlFor="Yes">Yes</label>&nbsp;&nbsp;
            <input
              type="radio"
              id="No"
              name="trip"
              value="no"
              onChange={(e) => setTrip(e.target.value)}
            />
            <label htmlFor="No">No</label>
          </div>
        </div>
        <div>
          <legend>Have you booked your Hotel already?</legend>

          <div class="radio-btns">
            <input
              type="radio"
              id="yes"
              name="hotel-booked"
              value="yes"
              onChange={(e) => setHotel(e.target.value)}
            />
            <label htmlFor="Yes">Yes</label>&nbsp;&nbsp;
            <input
              type="radio"
              id="No"
              name="hotel-booked"
              value="no"
              onChange={(e) => setHotel(e.target.value)}
            />
            <label htmlFor="No">No</label>
          </div>
        </div>
        <div>
          <legend>
            Are you interested in fun activities while at your destination?
          </legend>

          <div class="radio-btns">
            <input
              type="radio"
              id="yes"
              name="fun-interest"
              value="yes"
              onChange={(e) => setFun(e.target.value)}
            />
            <label htmlFor="Yes">Yes</label>&nbsp;&nbsp;
            <input
              type="radio"
              id="No"
              name="fun-interest"
              value="no"
              onChange={(e) => setFun(e.target.value)}
            />
            <label htmlFor="No">No</label>
          </div>
        </div>
        {fun == "yes" && (
          <div className="list-container">
            {checkList.map((item, index) => (
              <div key={index}>
                <input
                  value={item.label}
                  type="checkbox"
                  onChange={handleCheck}
                />
                <span className={isChecked(item)}>{item.q}</span>
              </div>
            ))}
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
      <p className="col-md-8 text-right">
        Already have an account?{" "}
        <Link className="btn btn-primary" to="/login">
          Login
        </Link>
      </p>
      <br />
      <br />
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        autoClose="3000"
        newestOnTop={true}
        closeOnClick={false}
        draggable={false}
        rtl={false}
      />
    </div>
  );
}
