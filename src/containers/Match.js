import React, { Component } from "react";
import "./Match.css";

export default class Match extends Component {
  render() {
    return (
      <div className="Match">
        <div className="lander">
          <h1>How it works</h1>
          <div className="row infoBlock">
            <div className="badge">1</div>
            <p>Click Create Groups to start maching and<br/>to send GROUP PIN to students in your class</p>
          </div>
          <div className="row infoBlock">
            <div className="badge">1</div>
            <p>Students answer matching questions and<br/>are intelligently and automatically grouped</p>
          </div>
          <div className="row infoBlock">
            <div className="badge">1</div>
            <p>You review and edit the groups and finally<br/>publish groups to your class</p>
          </div>
          <button>Start creating gr</button>
        </div>
      </div>
    );
  }
}
