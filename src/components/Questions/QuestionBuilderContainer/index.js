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
import QuestionDateTime from '../QuestionDateTime/index';

import './index.css';

const QUESTION_TYPES = [
  {label: 'Linear scale', type: QuestionLinearScale.questionType},
  {label: 'Date grid', type: QuestionDateTime.questionType},
];


class QuestionBuilderContainer extends Component {
  constructor(props) {
    super(props);

    const {id, title, questionType} = this.props.question;
    this.state = {
      id,
      title,
      questionType
    }
  }

  static getNewQuestion() {
    let newQuestion = {...QuestionLinearScale.defaultVal};
    newQuestion.id = uuidv4();

    return newQuestion;
  }

  getQuestionByType = (questionType=QuestionLinearScale.questionType, question) => {
    if (questionType === QuestionLinearScale.questionType) {
      return (
        <QuestionLinearScale
          question={question}
          updateQuestion={this.handleUpdateQuestion}
        />
      )
    } else if (questionType === QuestionDateTime.questionType) {
      return (
        <QuestionDateTime
          question={question}
          updateQuestion={this.handleUpdateQuestion}
        />
      )
    } else {
      return null;
    }
  };

  handleQuestionTypeChange = event => {
    let question = {};
    const questionType = event.target.value;

    if (questionType === QuestionLinearScale.questionType) {
      question = QuestionLinearScale.defaultVal;
    } else if (questionType === QuestionDateTime.questionType) {
      question = QuestionDateTime.defaultVal;
    }

    this.setState({questionType}, () => {
      this.handleUpdateQuestion(question);
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    }, () => {

      this.handleUpdateQuestion({});
    });
  };

  handleUpdateQuestion = (question) => {
    const updatedQuestion = {
      ...question,
      id: this.state.id,
      title: this.state.title,
      questionType: this.state.questionType
    };

    this.props.updateQuestion(updatedQuestion);
  };

  render() {
    const {questionNumber, deleteQuestion, question} = this.props;
    const {id, title, questionType} = this.state;

    const questionTypes = QUESTION_TYPES.map((item, i) => {
      return <option value={item.type} key={i}>{item.label}</option>;
    });

    return (
      <Grid>
        <Row className="questionHeader">
          <Col>
            <b>Question {questionNumber}</b>
            <button
              className="btn btn-default btn-xs deleteQuestion"
              onClick={(e) => deleteQuestion(e, id)}>
              delete
            </button>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup controlId="title">
              <FormControl
                type="text"
                placeholder="Untitled question"
                value={title}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup controlId="questionType">
              <FormControl
                componentClass="select"
                onChange={this.handleQuestionTypeChange}
                value={questionType}
              >
                {questionTypes}
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
        {this.getQuestionByType(questionType, question)}
      </Grid>
    );
  }
}

QuestionBuilderContainer.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  question: PropTypes.object.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};

export default QuestionBuilderContainer;
