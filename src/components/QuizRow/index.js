import React, {Component} from "react";
import "./style.css";

export default class Index extends Component {
  render() {
    const {title, status, questionsNum, expectedNum, votesNum, quizKey} = this.props;
    return (
      <div className="row quizBox">
        <div className="col col-lg-6">
          <h3>{title}</h3>
          <div>questions: <b>{questionsNum}</b></div>
          <div>status: <b>{status}</b></div>
        </div>
        <div className="col col-lg-2">
          <div>key: <b>{quizKey}</b></div>
        </div>
        <div className="col col-lg-2">
          <div>expected votes: {expectedNum}</div>
          <div>available votes: {votesNum}</div>
        </div>
        <div className="col col-lg-2">
          <div className="btn-toolbar">
            <button className="btn btn-default btn-sm">Edit</button>
            <button className="btn btn-default btn-sm">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}
