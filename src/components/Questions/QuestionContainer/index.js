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

import './index.css';

const QUESTION_TYPES = [
  {label: 'Linear scale', type: QuestionLinearScale.questionType},
  {label: 'Date grid', type: 'QuestionDateGrid'},
];


class QuestionContainer extends Component {
  constructor(props) {
    super(props);

    // this.state = {...this.props.question};
    const {id, title, questionType} = this.props.question;

    this.state = {
      id,
      title,
      questionType//: props.question.questionType
    }
  }

  static getNewQuestion() {
    let newQuestion = {...QuestionLinearScale.structure};
    newQuestion.id = uuidv4();

    return newQuestion;
  }

  static getQuestionsStructure() {
    return QuestionLinearScale.structure;
  }

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
                onChange={this.handleChange}
                value={questionType}
              >
                {questionTypes}
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
        <QuestionLinearScale
          question={question}
          updateQuestion={this.handleUpdateQuestion}
        />
      </Grid>
    );
  }
}

QuestionContainer.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  question: PropTypes.object.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};

export default QuestionContainer;
