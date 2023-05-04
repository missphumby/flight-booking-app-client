// Home Page

import React, { Component } from "react";
import "../App.css";
import "../styles/home.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import CarouselComp from "../components/carousel";
// import Footer from "../components/footerr";
class Home extends Component {
  state = {
    hotels: [],
    featured: [],
    recco: [],
    userstatus: false,
  };

  componentDidMount() {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/userstatus",
    }).then((res) => {
      this.setState({ userstatus: res.data });
      console.log(res.data);
    });
  }

  render() {
    return (
      <div>
        <section>
          <div className="banner">
            <Link to="/register" style={{ padding: "0", margin: "0" }}>
              <button className="start-exploring">Start Exploring</button>
            </Link>
            <CarouselComp />
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
