import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./style.css";

export default class QuizRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: true
    };
  }

  handleDeleteSurvey = (surveyId) => {
    this.setState({isVisible: false});
    this.props.deleteHandler(surveyId);
  };

  render() {
    const {surveyId, title, status, questionsNum, votesNum, pin, minGroupSize} = this.props;
    const isVisible = this.state.isVisible ? "" : "hidden";

    return (
      <div className={`row quizBox ${isVisible}`}>
        <div className="col col-lg-6">
          <h3>{title}</h3>
          <div>questions: <b>{questionsNum}</b></div>
          <div>status: <b>{status}</b></div>
        </div>
        <div className="col col-lg-2">
          <div>pin: <b>{pin}</b></div>
        </div>
        <div className="col col-lg-2">
          <div>votes #: {votesNum}</div>
        </div>
        <div className="col col-lg-2">
          <div>
            <Link to={`/surveys/${surveyId}`}>
              <button className="btn btn-default btn-xs">Edit</button>
            </Link>&nbsp;
            <button onClick={() => this.handleDeleteSurvey(surveyId)} className="btn btn-default btn-xs">Delete</button>
          </div>

          <div>
            {status === "PUBLISHED" &&
              <>
                <Link to={`/bematched/status/${surveyId}`}>
                  <button className="btn btn-warning btn-xs">Status</button>
                </Link>&nbsp;
              </>
            }
            {votesNum >= minGroupSize && status === "PUBLISHED" &&
              <Link to={`/bematched/status/${surveyId}`}>
                <button className="btn btn-warning btn-xs">Grouping</button>
              </Link>
            }
          </div>
        </div>
      </div>
    );
  }
}
