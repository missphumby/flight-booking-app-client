// This is the Navigation bar Component for all pages - "NavbarComp"

import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../App.css";

export default class NavbarComp extends Component {
  render() {
    return (
      <div className="home-header">
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
            <h1 className="trvl">travel</h1>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link href="/register">Register </Nav.Link>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link href="/login">Login </Nav.Link>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
