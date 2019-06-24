import React, {Component} from "react";
import PropTypes from "prop-types";
import {Col, Row, Label, Checkbox} from "react-bootstrap";
import './index.css';

const FIELD_RULES = {
  'minValue': '^[0-9]*$',
  'maxValue': '^[0-9]*$',
};

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

const cellSize = index => index < 5 ? 2 : 1;
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

export default class QuestionDateTime extends Component {

  constructor(props) {
    super(props);
    const {id, dateValue, questionType} = this.props.question;
    this.state = {
      id,
      dateValue: dateValue || QuestionDateTime.defaultVal.dateValue,
      questionType
    };
  }

  isCellChecked = (date, time) => {
    const {dateValue} = this.state;

    try {
      return dateValue[date][time];
    } catch (e) {
      return false;
    }
  };

  handleChange = (event, dateItem, timeItem) => {
    let {dateValue} = this.state;
    let updatedDateValue = cloneDataArr(dateValue);

    updatedDateValue[dateItem][timeItem] = event.target.value === "on";

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
      this.props.updateQuestion({
        id: this.state.id,
        // on questions builder we don't need values for such type of question
        // dateValue: this.state.dateValue,
        dateValue: buildQuestionArray(),
        questionType: QuestionDateTime.questionType
      });
    });
  };

  static get questionType() {
    return "QuestionDateTime";
  }

  static get defaultVal() {
    return {
      dateValue: buildQuestionArray(),
      questionType: QuestionDateTime.questionType
    };
  }

  static validator(value) {
  }

  render() {
    return (
      <>
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
                    onChange={(e) => this.handleChange(e, dateItem.id, timeItem.id)}
                    checked={this.isCellChecked(dateItem.id, timeItem.id)}
                  />
                </td>
              )}
            </tr>
          )}
          </tbody>
        </table>
      </>
    );
  }
}

QuestionDateTime.propTypes = {
  question: PropTypes.object.isRequired,
  updateQuestion: PropTypes.func.isRequired
};
