import React, {Component} from "react";
import PropTypes from "prop-types";
import {Col, Row, Label, Checkbox} from "react-bootstrap";
import './index.css';
import {setAnswerStatus} from "../../../actions/surveys";
import {connect} from "react-redux";


const QUESTION_DATE_STRUCTURE = [
  {
    id: 0,
    title: 'Monday',
  }, {
    id: 1,
    title: 'Tuesday',
  }, {
    id: 2,
    title: 'Wednesday',
  }, {
    id: 3,
    title: 'Thursday',
  }, {
    id: 4,
    title: 'Friday',
  }, {
    id: 5,
    title: 'Saturday',
  }, {
    id: 6,
    title: 'Sunday',
  }];

const QUESTION_TIME_STRUCTURE = [
  {
    id: 0,
    description: 'All day'
  }, {
    id: 1,
    description: '8-10'
  }, {
    id: 2,
    description: '10-12'
  }, {
    id: 3,
    description: '12-14'
  }, {
    id: 4,
    description: '14-16'
  }, {
    id: 5,
    description: '16-18'
  }
];

const buildQuestionArray = () => {
  const result = new Array(7);
  for (let i = 0; i < result.length; i++) {
    result[i] = new Array(6);
  }

  return result;
};

const cloneDataArr = arr => {
  return arr.map(arr => arr.slice());
};

class QuestionDateTimeReply extends Component {
  constructor(props) {
    super(props);
    const {id, questionType} = this.props.question;
    this.state = {
      id,
      dateValue: buildQuestionArray(),
      questionType
    };
  }

  componentDidMount() {
    this.props.setAnswerStatus(this.props.question.id, this.isValid());
  }

  handleChange = (event, dateItem, timeItem) => {
    let {dateValue} = this.state;
    let updatedDateValue = cloneDataArr(dateValue);

    updatedDateValue[dateItem][timeItem] = !updatedDateValue[dateItem][timeItem];

    // reset all other time slots on the same day
    if (timeItem === 0 && event.target.value === "on") {
      for (let i = 1; i < QUESTION_TIME_STRUCTURE.length; i++) {
        updatedDateValue[dateItem][i] = false;
      }
    }

    // reset "all day" if any other time slot was selected
    if (timeItem !== 0 && event.target.value === "on") {
      updatedDateValue[dateItem][0] = false;
    }

    this.setState({dateValue: updatedDateValue}, () => {
      this.props.setAnswerStatus(this.props.question.id, this.isValid());

      this.props.handleAnswer({
        questionId: this.state.id,
        value: JSON.stringify(this.state.dateValue)
      });
    });
  };

  static get questionType() {
    return "QuestionDateTimeReply";
  }

  isValid = () => {
    return this.state.dateValue.some(column => column.some(cell => cell !== false));
  };

  render() {
    const {dateValue} = this.state;

    return (
      <Row>
        <Col className="errorMessage">
          {!this.isValid() && <span>At least 1 time frame has to be selected</span>}
        </Col>
        <Col>
          <table width="100%">
            <tbody>
              <tr>
                {QUESTION_DATE_STRUCTURE.map((dateItem, i) =>
                  <td width="14%" key={dateItem.id} className="questionCellHeader text-center">
                    {dateItem.title}
                  </td>
                )}
              </tr>
              {QUESTION_TIME_STRUCTURE.map(timeItem =>
                <tr key={timeItem.id}>
                  {QUESTION_DATE_STRUCTURE.map((dateItem, i) =>
                    <td width="14%" key={dateItem.id} className="questionCellData">
                      <div className="cellLabel">{timeItem.description}</div>
                      <Checkbox
                        onClick={(e) => this.handleChange(e, dateItem.id, timeItem.id)}
                        checked={dateValue[dateItem.id][timeItem.id]}
                      />
                    </td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </Col>
      </Row>
    );
  }
}

QuestionDateTimeReply.propTypes = {
  question: PropTypes.object.isRequired,
  handleAnswer: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  setAnswerStatus: (questionId, status) => dispatch(setAnswerStatus(questionId, status))
});

export default connect(
  null,
  mapDispatchToProps
)(QuestionDateTimeReply);
