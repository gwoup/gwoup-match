import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./index.css";

export default class Intro extends Component {
  render() {
    return (
      <div className="Intro">
        <div className="lander">
          <h1>How it works</h1>
          <div className="row infoBlock">
            <div className="badge">1</div>
            <p>Click "Add new survey" to start matching and<br/>to send GROUP PIN to students in your class</p>
          </div>
          <div className="row infoBlock">
            <div className="badge">2</div>
            <p>Students answer matching questions and<br/>are intelligently and automatically grouped</p>
          </div>
          <div className="row infoBlock">
            <div className="badge">3</div>
            <p>You review and edit the groups and finally<br/>publish groups to your class</p>
          </div>
          <div>
            <Link to="/surveys/new">
              <button className="btn btn-success">Add new survey</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
