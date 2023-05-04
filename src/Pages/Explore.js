// Explore Page

import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "../App.css";
import "../styles/explore.css";
import Axios from "axios";
import FlightsComp from "../components/flights";
import HotelsComp from "../components/hotels";
import SportsComp from "../components/activities.js";
import options from "../components/data";
import "react-bootstrap-typeahead/css/Typeahead.css";

class Explore extends Component {
  state = {
    hotels: [],
    flights: [],
    sports: [],
    source: "",
    destCity: "",
    sourceCity: "",
    destination: "",
    datefrom: new Date(1999, 0, 1),
    dateto: new Date(1999, 0, 1),
    days: 0,
    flightPrice: 0,
    flightcarriercode: "",
    flightnumber: 0,
    flightarrival: "",
    flightdeparture: "",
    hotelPrice: 0,
    hotelimageurl: "",
    hotellocation: "",
    hotelname: "",
    sportPrice: 0,
    sporttype: "",
    sportimageurl: "",
    progress: 0,
    hotelSelectID: "",
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

  handleSearchClick = (e) => {
    e.preventDefault();
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
      Axios({
        method: "POST",
        withCredentials: true,
        url: "http://localhost:5000/date",
        data: {
          arrival: this.state.dateto,
          locationDeparture: this.state.source,
          locationArrival: this.state.destination,
        },
      }).then((res) => {
        this.setState({ flights: res.data });
        localStorage.setItem("searchloc", this.state.destCity);
        console.log(this.state.flights);
        console.log(res.data);
      });
    }
  };

  handleSortChange = async (e) => {
    //console.log(e.target.value);

    let list = this.state.hotels;
    if (e.target.value === "p-asc") {
      list.sort(function (a, b) {
        return a.price - b.price;
      });
    }
    if (e.target.value === "p-desc") {
      list.sort(function (a, b) {
        return b.price - a.price;
      });
    }
    await this.setState({ hotels: list });
  };

  selectFlight = (price, departure, arrival, carriercode, number) => {
    this.setState({
      flightPrice: price,
      flightarrival: arrival,
      flightdeparture: departure,
      flightcarriercode: carriercode,
      flightnumber: number,
    });
  };

  selectHotel = (price, id, name, location, imageurl) => {
    this.setState({
      hotelPrice: price,
      hotelSelectID: id,
      hotelname: name,
      hotellocation: location,
      hotelimageurl: imageurl,
    });
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
      userstatus: true,
    });

    this.setState({
      totalSportPrice: this.state.checked.reduce((total, item) => {
        return total + parseFloat(item) * parseInt(this.state.days);
      }, 0),
    });
  };

  handleProceed = () => {
    this.setState({ progress: this.state.progress + 1 });
    console.log(this.state.progress);
    let destination = localStorage.getItem("searchloc");

    Axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:5000/hotelsearch",
      data: {
        searchloc: destination,
        datefrom: this.state.datefrom,
        dateto: this.state.dateto,
      },
    }).then((res) => {
      this.setState({ hotels: res.data });
      console.log("res", res.data);
      console.log(destination);
    });
    console.log(destination);
    //console.log(this.state.datefrom);
  };
  handleProceed2 = () => {
    this.setState({ progress: this.state.progress + 1 });
    console.log(this.state.progress);
    let checkedItems = localStorage.getItem("checkedItems");
    console.log(checkedItems);
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
  };

  handleBackProceed = () => {
    this.setState({ progress: this.state.progress - 1 });
    //console.log(this.state.progress);
  };

  handleBook = () => {
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
        hotelId: this.state.hotelSelectID,
        hotelcost: this.state.hotelPrice,
        hotelname: this.state.hotelname,
        hotellocation: this.state.hotellocation,
        hotelimageurl: this.state.hotelimageurl,
        flightcost: this.state.flightPrice,
        flightarrival: this.state.flightarrival,
        flightdeparture: this.state.flightdeparture,
        flightcarriercode: this.state.flightcarriercode,
        flightnumber: this.state.flightnumber,
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
            {this.state.progress === 2 ? (
              <select
                onChange={this.handleSortChange}
                name="sortselect"
                id="sortselect"
              >
                <option value="none" defaultValue disabled hidden>
                  {" "}
                  Sort By{" "}
                </option>
                <option value="p-asc">Price (Ascending)</option>
                <option value="p-desc">Price (Descending)</option>
              </select>
            ) : null}
            <br />
            <hr />
            <b>Flight Price:</b> $ {this.state.flightPrice}
            <br />
            <b>Hotel Price:</b> $ {this.state.hotelPrice} x {this.state.days}{" "}
            nights
            <br />
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
            {(
              parseFloat(this.state.flightPrice) +
              parseFloat(this.state.hotelPrice) * parseInt(this.state.days) +
              parseFloat(this.state.totalSportPrice)
            ).toFixed(2)}
            <br />
            {this.state.progress === 1 ? (
              <div>
                <button className="proceed-button" onClick={this.handleProceed}>
                  Proceed ➡
                </button>{" "}
                <br />
                <button
                  className="proceed-button"
                  onClick={this.handleBackProceed}
                >
                  Go Back ⬅
                </button>
              </div>
            ) : null}
            {this.state.progress === 2 ? (
              <div>
                <button
                  className="proceed-button"
                  onClick={this.handleProceed2}
                >
                  Proceed ➡
                </button>{" "}
                <br />
                <button
                  className="proceed-button"
                  onClick={this.handleBackProceed}
                >
                  Go Back ⬅
                </button>
              </div>
            ) : null}
            {this.state.progress === 3 ? (
              this.state.userstatus === false ? (
                <div>
                  <button
                    className="proceed-button"
                    onClick={this.handleBackProceed}
                  >
                    Go Back ⬅
                  </button>
                  <br />
                </div>
              ) : (
                <div>
                  <button
                    className="proceed-button"
                    onClick={this.handleBackProceed}
                  >
                    Go Back ⬅
                  </button>
                  <br />
                  <button className="proceed-button" onClick={this.handleBook}>
                    Book!
                  </button>
                </div>
              )
            ) : null}
          </div>

          <br />

          <div className="right2">
            {this.state.progress === 0 ? (
              <h1>Select Dates 📅 </h1>
            ) : this.state.progress === 1 ? (
              <div>
                <h1>Select A Flight ✈️</h1>
                <br />
                <ProgressBar animated now={30} />

                {this.state.flights?.length === 0 ? (
                  <img
                    src="https://miro.medium.com/max/1158/1*9EBHIOzhE1XfMYoKz1JcsQ.gif"
                    alt="Load"
                  />
                ) : (
                  <FlightsComp
                    flights={this.state.flights}
                    selectFlight={this.selectFlight}
                  />
                )}
              </div>
            ) : this.state.progress === 2 ? (
              <div>
                <h1>Select a Hotel 🏡</h1>
                <br />
                <ProgressBar animated now={60} />
                <HotelsComp
                  hotels={this.state.hotels}
                  datefrom={this.state.datefrom}
                  dateto={this.state.dateto}
                  selectHotel={this.selectHotel}
                />
              </div>
            ) : this.state.progress === 3 ? (
              <div>
                <h1>Select your Interests 🚲</h1>
                <br />
                <ProgressBar animated now={90} />
                <SportsComp
                  selectSport={this.selectSport}
                  sports={this.state.sports}
                  checked={this.state.checked}
                  totalprice={this.calculateSportPrice}
                  // days={this.state.days}
                />
              </div>
            ) : (
              <div>
                <ProgressBar animated now={100} />
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
