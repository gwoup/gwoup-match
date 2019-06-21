import React, {Component} from "react";
import PropTypes from "prop-types";
import {
  FormGroup,
  Row,
  Col,
  Grid,
  FormControl
} from "react-bootstrap";
import {v4 as uuidv4} from "uuid";
import QuestionLinearScale from '../QuestionLinearScale/index';
import QuestionLinearScaleReply from '../QuestionLinearScaleReply/index';
import QuestionDateTime from '../QuestionDateTime/index';
import QuestionDateTimeReply from '../QuestionDateTimeReply/index';

import './index.css';

class QuestionContainer extends Component {

  getQuestionByType = (questionType, question) => {
    if (questionType === QuestionLinearScale.questionType) {
      return (
        <QuestionLinearScaleReply
          question={question}
          handleAnswer={this.props.handleAnswer}
        />
      )
    }

    if (questionType === QuestionDateTime.questionType) {
      return (
        <QuestionDateTimeReply
          question={question}
          handleAnswer={this.props.handleAnswer}
        />
      )
    }

    return null;
  };

  render() {
    const {questionNumber, question} = this.props;

    return (
      <Grid>
        <Row className="questionHeader">
          <Col className="text-left">
            <b>Question {questionNumber}</b>
            <p>{question.title}</p>
          </Col>
        </Row>
        {this.getQuestionByType(question.questionType, question)}
      </Grid>
    );
  }
}

QuestionContainer.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  question: PropTypes.object.isRequired,
  handleAnswer: PropTypes.func.isRequired,
};

export default QuestionContainer;
