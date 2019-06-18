import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./style.css";

export default class QuizRow extends Component {
  render() {
    const {id, title, status, questionsNum, expectedNum, votesNum, uKey, deleteHandler} = this.props;
    return (
      <div className="row quizBox">
        <div className="col col-lg-6">
          <h3>{title}</h3>
          <div>questions: <b>{questionsNum}</b></div>
          <div>status: <b>{status}</b></div>
        </div>
        <div className="col col-lg-2">
          <div>key: <b>{uKey}</b></div>
        </div>
        <div className="col col-lg-2">
          <div>expected votes: {expectedNum}</div>
          <div>available votes: {votesNum}</div>
        </div>
        <div className="col col-lg-2">
          <div className="btn-toolbar">
            <Link to={`/quizzes/${id}`}>
              <button className="btn btn-default btn-sm">Edit</button>
            </Link>
            <button onClick={() => deleteHandler(id)} className="btn btn-default btn-sm">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}
