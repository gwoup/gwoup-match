import React, {Component} from "react";
import PropTypes from "prop-types";
import {
  HelpBlock,
  FormGroup,
  Row,
  Col,
  Grid,
  FormControl,
  ControlLabel
} from "react-bootstrap";

import {connect} from "react-redux";

import LoaderButton from "../../components/LoaderButton";
import QuestionBuilderContainer from "../../components/Questions/QuestionBuilderContainer";
import {saveSurvey, getSurveyById} from "../../actions/surveys";
import {serializeQuestionsArr, deserializeQuestionsArr} from "../../utils/survey";


import "./styles.css";


class BeMatchedStatus extends Component {

  render() {

    return (
      <div className="container">
        Status: !
      </div>
    );
  }
}

export default BeMatchedStatus;