import React, {Component} from "react";
import {connect} from "react-redux";
import {Col, ControlLabel, FormControl, FormGroup, Grid, Row, HelpBlock} from "react-bootstrap";

import LoaderButton from "../../components/LoaderButton";
import "./index.css";
import {submitAnswer, setAnswerStatus} from "../../actions/surveys";
import QuestionLinearScale from "../../components/Questions/QuestionLinearScale";
import QuestionLinearScaleReply from "../../components/Questions/QuestionLinearScaleReply";
import QuestionDateTime from "../../components/Questions/QuestionDateTime";
import QuestionDateTimeReply from "../../components/Questions/QuestionDateTimeReply";


class BeMatchedBySurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: "",
      title: "",
      questions: [],
      answers: [],
      isSaving: false,
      isFormValid: false,
      validationState: null,
      errorMsg: null
    };
  }

  getQuestionByType = (questionType, question) => {
    if (questionType === QuestionLinearScale.questionType) {
      return (
        <QuestionLinearScaleReply
          question={question}
          handleAnswer={this.handleAnswer}
        />
      )
    }

    if (questionType === QuestionDateTime.questionType) {
      return (
        <QuestionDateTimeReply
          question={question}
          handleAnswer={this.handleAnswer}
        />
      )
    }

    return null;
  };

  componentDidMount() {
    const {matchingSurvey} = this.props;

    if (typeof matchingSurvey === "undefined" || matchingSurvey === null) {
      this.props.history.push('/bematched');
    } else {
      const {pin, title, questions} = matchingSurvey;
      this.setState({pin, title, questions});
    }
  }

  handleAnswer = (answer) => {
    let answerIndex = -1;
    const {answers} = this.state;

    for (let i = 0; i < answers.length; i++) {
      if (answers[i].questionId === answer.questionId) {
        answerIndex = i;
        break;
      }
    }

    let updatedAnswers;

    if (answerIndex === -1) {
      updatedAnswers = [...answers, answer];
    } else {
      updatedAnswers = [
        ...answers.slice(0, answerIndex),
        answer,
        ...answers.slice(answerIndex + 1, answers.length)
      ];
    }

    this.setState({answers: updatedAnswers});
  };

  handleSubmit = async event => {
    event.preventDefault();
    const {surveyId} = this.props.matchingSurvey;

    this.setState({isSaving: true});
    const {answers} = this.state;

    try {
      // add validation
      await this.props.submitAnswer(surveyId, answers);
      this.props.history.push(`/bematched/survey/status/${surveyId}`);
    } catch (e) {
      console.log(e);
    }

    this.setState({isSaving: false});
  };

  isFormValid = () => {
    const {formAnswersStatus} = this.props;
    return Object.values(formAnswersStatus).every(val => val);
  };

  render() {
    const {title, pin, questions, isSaving} = this.state;

    return (
      <div className="BeMatchedBySurvey">
        <h4>You are answering questions for:</h4>
        <h3><b>{title}</b> - pin <b>{pin}</b></h3>
        <form onSubmit={this.handleSubmit}>
          <Grid>
            {questions.map((question, index) =>
              <Row key={question.id} className="questionFormContainer">
                <Col>
                  <Grid>
                    <Row className="questionHeader">
                      <Col className="text-left">
                        <b>Question {index + 1}</b>
                        <p>{question.title}</p>
                      </Col>
                    </Row>
                    {this.getQuestionByType(question.questionType, question)}
                  </Grid>
                </Col>
              </Row>
            )}
            <Row className="buttonsContainer">
              <Col xs={12} mdOffset={4} md={4}>
                <LoaderButton
                  block
                  bsSize="large"
                  bsStyle="success"
                  disabled={!this.isFormValid()}
                  type="button"
                  isLoading={isSaving}
                  text="Submit"
                  loadingText="Publishing…"
                  onClick={() => this.handlePublish()}
                />
              </Col>
            </Row>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    matchingSurvey: state.surveys.matchingSurvey,
    formAnswersStatus: state.surveys.formAnswersStatus
  }
);

const mapDispatchToProps = dispatch => ({
  submitAnswer: (surveyId, answers) => dispatch(submitAnswer(surveyId, answers)),
  setAnswerStatus: (questionId, status) => dispatch(setAnswerStatus(questionId, status))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeMatchedBySurvey);
