import React, {Component} from "react";
import {connect} from "react-redux";
import {Col, ControlLabel, FormControl, FormGroup, Grid, Row, HelpBlock} from "react-bootstrap";

import LoaderButton from "../../components/LoaderButton";
import "./index.css";
import QuestionContainer from "../../components/Questions/QuestionContainer";
import {submitAnswer} from "../../actions/surveys";


class BeMatchedBySurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: "",
      title: "",
      questions: [],
      answers: [],
      isSaving: false,
      validationState: null,
      errorMsg: null
    };
  }

  componentDidMount() {
    const {matchingSurvey} = this.props;

    if (typeof matchingSurvey === "undefined" || matchingSurvey === null) {
      this.props.history.push('/bematched');
    } else {
      const {pin, title, questions} = matchingSurvey;
      this.setState({pin, title, questions});
    }
  }

  handleAnswerQuestion = (answer) => {
    let answerIndex = -1;
    const {answers} = this.state;

    for (let i = 0; i < answers.length; i++) {
      if (answers[i].questionId === answer.questionId) {
        answerIndex = i;
        break;
      }
    }

    let updatedQuestions;

    if (answerIndex === -1) {
      updatedQuestions = {answers: {...answers, answer}};
    } else {
      updatedQuestions = [
        ...answers.slice(0, answerIndex),
        answer,
        ...answers.slice(answerIndex + 1, answers.length)
      ];
    }

    console.log("updated questions", updatedQuestions);
    this.setState({answers: updatedQuestions});

  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({isSaving: true});
    const {answers} = this.state;

    try {
      // add validation
      await this.props.submitAnswer(this.matchingSurvey.id, answers);
      this.props.history.push('/bematched/status');
    } catch (e) {
      console.log(e);
    }

    this.setState({isSaving: false});
  };

  isFormValid = () => {
    return false;
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
                  <QuestionContainer
                    questionNumber={index + 1}
                    question={question}
                    handleAnswer={this.handleAnswerQuestion}
                  />
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
  {matchingSurvey: state.surveys.matchingSurvey}
);

const mapDispatchToProps = dispatch => ({
  submitAnswer: (surveyId, answers) => dispatch(submitAnswer(surveyId, answers)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeMatchedBySurvey);
