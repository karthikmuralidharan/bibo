import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">BIBO</h1>
            <h2 className="subtitle">
              An experiment to determine the correlation between our breath and
              memory
            </h2>
          </div>
        </div>
      </section>
    );
  }
}

export default Header;
