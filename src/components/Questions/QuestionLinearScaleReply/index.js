import React, {Component} from "react";
import PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './index.css';

export default class QuestionLinearScaleReply extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  static get questionType() {
    return "QuestionLinearScaleReply";
  }

  static validator(value) {

  }

  componentDidMount() {
    const {minValue} = this.props.question;
    this.setState({value: parseInt(minValue)});
  }

  onSliderChange = (value) => {
    this.setState({value}, () => {
      this.props.handleAnswer({
        questionId: this.state.id,
        value: JSON.stringify({value: this.state.value})
      });
    });
  };

  render() {
    const {minValue, minValueTitle, maxValue, maxValueTitle} = this.props.question;
    const {value} = this.state;

    return (
      <Row>
        <Col xs={12} md={12}>
          <div className="labelContainer">
            <div className="minLabel">{minValueTitle}</div>
            <div className="valueLabel">{value}</div>
            <div className="maxLabel">{maxValueTitle}</div>
          </div>
          <div style={{width: "100%"}}>
            <Slider
              min={parseInt(minValue)}
              max={parseInt(maxValue)}
              value={value}
              onChange={this.onSliderChange}
            />
          </div>
        </Col>
      </Row>
    );
  }
}

QuestionLinearScaleReply.propTypes = {
  question: PropTypes.object.isRequired,
  handleAnswer: PropTypes.func.isRequired
};
