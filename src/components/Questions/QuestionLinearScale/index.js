import React, {Component} from "react";
import PropTypes from "prop-types";
import {Col, FormControl, FormGroup, Row} from "react-bootstrap";
import './index.css';

const FIELD_RULES = {
  'minValue': '^[0-9]*$',
  'maxValue': '^[0-9]*$',
};

export default class QuestionLinearScale extends Component {

  constructor(props) {
    super(props);
    const {id, minValue, minValueTitle, maxValue, maxValueTitle, questionType} = this.props.question;
    this.state = {id, minValue, minValueTitle, maxValue, maxValueTitle, questionType};
  }

  handleChange = event => {
    if (FIELD_RULES[event.target.id] && !event.target.value.match(FIELD_RULES[event.target.id])) {
      return;
    }

    this.setState({
      [event.target.id]: event.target.value
    }, () => {
      this.props.updateQuestion({
        id: this.state.id,
        minValue: this.state.minValue,
        minValueTitle: this.state.minValueTitle,
        maxValue: this.state.maxValue,
        maxValueTitle: this.state.maxValueTitle,
        questionType: QuestionLinearScale.questionType
      });
    });
  };

  static get questionType() {
    return "QuestionLinearScale";
  }

  static get structure() {
    return {
      minValue: 1,
      minValueTitle: "Not important at all",
      maxValue: 10,
      maxValueTitle: "Very important",
      questionType: QuestionLinearScale.questionType
    };
  }

  static validator(value) {

  }

  render() {
    const {minValue, minValueTitle, maxValue, maxValueTitle} = this.state;

    return (
      <>
        <Row>
          <Col xs={2} md={2}>
            <FormGroup controlId="minValue">
              <FormControl
                type="text"
                value={minValue}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
          <Col xs={10} md={10}>
            <FormGroup controlId="minValueTitle">
              <FormControl
                type="text"
                value={minValueTitle}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={2} md={2}>
            <FormGroup controlId="maxValue">
              <FormControl
                type="text"
                value={maxValue}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
          <Col xs={10} md={10}>
            <FormGroup controlId="maxValueTitle">
              <FormControl
                type="text"
                value={maxValueTitle}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
      </>
    );
  }
}

QuestionLinearScale.propTypes = {
  question: PropTypes.object.isRequired,
  updateQuestion: PropTypes.func.isRequired
};
