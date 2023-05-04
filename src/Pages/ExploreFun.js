// Explore Page

import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "../App.css";
import "../styles/explore.css";
import Axios from "axios";
import SportsComp from "../components/activities.js";
import options from "../components/data";
import "react-bootstrap-typeahead/css/Typeahead.css";

class Explore extends Component {
  state = {
    sports: [],
    source: "",
    destCity: "",
    sourceCity: "",
    destination: "",
    datefrom: new Date(1999, 0, 1),
    dateto: new Date(1999, 0, 1),
    days: 0,
    sportPrice: 0,
    sporttype: "",
    sportimageurl: "",
    progress: 0,
    userstatus: false,
    sport: "",
    totalSportPrice: 0,
    checked: [],
    checkedItems: "",
  };

  totalprice = this.state.checked.length
    ? this.state.checked.reduce((total, item) => {
        return total + parseFloat(item) * this.state.days;
      }, 0)
    : 0;

  handleSourceChange = async (e) => {
    if (e[0]) {
      console.log(e[0].capital);
      this.setState({ source: e[0].capital });
      this.setState({ sourceCity: e[0].label });
    }

    //await this.setState({source: e.target.value});
  };
  handleDestinationChange = async (e) => {
    if (e[0]) {
      console.log(e[0].capital);
      this.setState({ destination: e[0].capital });
      this.setState({ destCity: e[0].label });
    }
    //await this.setState({destination: e.target.value});
  };

  handleDateFromChange = async (e) => {
    await this.setState({ datefrom: e.target.value });
  };

  handleDateToChange = async (e) => {
    await this.setState({ dateto: e.target.value });
    var d1 = new Date(this.state.dateto);
    var d2 = new Date(this.state.datefrom);
    var diff_time = d1.getTime() - d2.getTime();
    var diff_days = diff_time / (1000 * 3600 * 24);
    this.setState({ days: diff_days });
  };

  selectSport = (price, type, imageurl, event) => {
    var updatedList = [...this.state.checked];
    if (event.target.checked) {
      updatedList = [...this.state.checked, event.target.value];
    } else {
      updatedList.splice(this.state.checked.indexOf(event.target.value), 1);
    }
    // this.setState({ checked: updatedList });
    this.setState({
      checked: updatedList,
      sportPrice: price,
      sporttype: type,
      sportimageurl: imageurl,
    });

    this.setState({
      totalSportPrice: this.state.checked.reduce((total, item) => {
        return total + parseFloat(item) * parseInt(this.state.days);
      }, 0),
    });
  };

  handleSearchClick = (e) => {
    e.preventDefault();
    this.setState({ progress: this.state.progress + 1 });
    console.log(this.state.progress);
    let checkedItems = localStorage.getItem("checkedItems");
    console.log(checkedItems);
    var d = new Date("2000-01-01");
    var d1 = new Date(this.state.dateto);
    var d2 = new Date(this.state.datefrom);
    if (
      this.state.source === "" ||
      this.state.destination === "" ||
      (d1 < d) | (d2 < d)
    ) {
      alert("Please fill all fields to proceed!");
    } else if (d1 < d2) {
      alert("You can't travel back in time, sweetie");
    } else {
      this.setState({ progress: 1 });
      {
        checkedItems == "" || checkedItems == "undefined"
          ? Axios({
              method: "GET",
              withCredentials: true,
              url: "http://localhost:5000/getSports",
            }).then((res) => {
              this.setState({ sports: res.data });
              console.log("res", res.data);
            })
          : Axios({
              method: "POST",
              withCredentials: true,
              url: "http://localhost:5000/activitysearch",
              data: {
                activity: checkedItems,
                datefrom: this.state.datefrom,
                dateto: this.state.dateto,
              },
            }).then((res) => {
              this.setState({ sports: res.data });
              console.log("res", res.data);
            });
      }
    }
  };
  handleBook = () => {
    this.setState({ userstatus: true });
    this.setState({ progress: this.state.progress + 1 });
    let userId = localStorage.getItem("id");
    this.setState({
      totalSportPrice: this.state.checked.reduce((total, item) => {
        return total + parseFloat(item) * parseInt(this.state.days);
      }, 0),
    });
    Axios({
      method: "PATCH",
      withCredentials: true,
      url: `http://localhost:5000/book/${userId}`,
      data: {
        source: this.state.source,
        destination: this.state.destination,
        datefrom: this.state.datefrom,
        dateto: this.state.dateto,
        sportcost: this.state.totalSportPrice,
        sporttype: this.state.sporttype,
        sportimageurl: this.state.sportimageurl,
      },
    }).then((res) => {
      console.log(res.data);
    });
  };

  render() {
    return (
      <div>
        <div className="search">
          <form action="#">
            <div className="search1" data-panel-bounds="true">
              <div className="destination">
                <div className="search-input">
                  <Typeahead
                    id="basic-example"
                    onChange={this.handleSourceChange}
                    options={options}
                    placeholder="Where from?"
                  />
                </div>
              </div>

              <div className="separator"></div>

              <div className="destination">
                <div className="search-input">
                  <Typeahead
                    id="basic-example"
                    onChange={this.handleDestinationChange}
                    options={options}
                    placeholder="Where to?"
                  />
                </div>
              </div>

              <div className="separator"></div>

              <div className="dates">
                <div className="checkin">
                  <div className="search-input">
                    <input
                      type="date"
                      name="From"
                      placeholder="From"
                      onChange={this.handleDateFromChange}
                    />
                  </div>
                </div>

                <div className="separator"></div>

                <div className="checkout">
                  <div className="search-input">
                    <input
                      type="date"
                      name="To"
                      placeholder="To"
                      onChange={this.handleDateToChange}
                    />
                  </div>
                </div>
              </div>

              <div className="button-container">
                <button
                  type="submit"
                  className="search-button"
                  onClick={this.handleSearchClick}
                >
                  <img
                    src="https://icon-library.com/images/white-search-icon-transparent-background/white-search-icon-transparent-background-1.jpg"
                    width="20px"
                    alt="search-icon"
                  />
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="container2">
          <div className="left2">
            <br />
            <hr />
            <b>Activities Price:</b>
            {this.state.checked.length
              ? this.state.checked.map((c) => (
                  <p>
                    $ {c} x {this.state.days} days
                  </p>
                ))
              : `$ ${this.state.sportPrice} x ${this.state.days} days`}
            <br />
            <hr />
            <b>Subtotal: </b> $
            {parseFloat(this.state.totalSportPrice).toFixed(2)}
            <br />
            <button className="proceed-button" onClick={this.handleBook}>
              Book!
            </button>
          </div>

          <div className="right2">
            {this.state.userstatus === false ? (
              <div>
                <h1>Select your Interests 🚲</h1>
                <br />
                <SportsComp
                  selectSport={this.selectSport}
                  sports={this.state.sports}
                  checked={this.state.checked}
                  totalprice={this.calculateSportPrice}
                />
              </div>
            ) : (
              <div>
                <h1>Booking Complete!</h1>
                <img
                  src="https://thumbs.gfycat.com/QuaintLikelyFlyingfish-size_restricted.gif"
                  alt="Done"
                />
              </div>
            )}
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Explore;
