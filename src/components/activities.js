// This is the "view all products" Products Component for the Shop Page - "ProductsComp" (blueprint code to dynamically serve product data)

import React from "react";
import "../App.css";
import "../styles/explore.css";

const SportsComp = ({ sports, selectSport, checked }) => {
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <div>
      {sports.map((sport) => (
        <li key={sport.name}>
          <div className="card">
            <img className="hotel-image" src={sport.image} alt="sport" />

            <div className="right3">
              <div className="hotel-name">{sport.name}</div>

              <div className="hotel-price">
                <b>${sport.price} per day</b>
                <br />
                <br />

                <div>
                  <input
                    value={sport.price}
                    type="checkbox"
                    onChange={(e) =>
                      selectSport(sport.price, sport.name, sport.image, e)
                    }
                  />
                  &nbsp;&nbsp;
                  <span className={isChecked(sport)} style={{ color: "blue" }}>
                    select
                  </span>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
};

export default SportsComp;
