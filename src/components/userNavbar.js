// This is the Navigation bar Component for all pages - "NavbarComp"

import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../App.css";

export default class NavbarComp extends Component {
  render(props) {
    return (
      <div className="header">
        <Navbar
          style={{
            padding: "2.5%",
            paddingRight: "3%",
            paddingLeft: "3%",
            height: "110px",
            fontSize: "2.5rem",
            width: "100%",
            overflowX: "hidden",
            overflowY: "hidden",
            position: "absolute",
          }}
          fixed="top"
        >
          <Navbar.Brand href="/" style={{ color: "white" }}>
            <h3 className="welcome">Welcome {this.props.name}</h3>
          </Navbar.Brand>

          <Navbar.Collapse className="justify-content-end">
            <Nav.Link onClick={this.props.logout}>Logout </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
