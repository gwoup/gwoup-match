import React, {Component} from "react";
import PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './index.css';
import {setAnswerStatus} from "../../../actions/surveys";
import {connect} from "react-redux";

class QuestionLinearScaleReply extends Component {

  constructor(props) {
    super(props);

    const {id, minValue} = this.props.question;
    this.state = {
      value: minValue,
      id
    };
  }

  componentDidMount() {
    this.props.setAnswerStatus(this.props.question.id, this.isValid());
  }

  static get questionType() {
    return "QuestionLinearScaleReply";
  }

  isValid = () => {
    return true;
  };

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

const mapDispatchToProps = dispatch => ({
  setAnswerStatus: (questionId, status) => dispatch(setAnswerStatus(questionId, status))
});

export default connect(
  null,
  mapDispatchToProps
)(QuestionLinearScaleReply);
