import React, {Component} from "react";
import PropTypes from "prop-types";
import {
  HelpBlock,
  FormGroup,
  Row,
  Col,
  Grid,
  FormControl,
  ControlLabel
} from "react-bootstrap";

import {connect} from "react-redux";

import LoaderButton from "../../components/LoaderButton";
import QuestionBuilderContainer from "../../components/Questions/QuestionBuilderContainer";
import {saveSurvey, getSurveyById, publishSurvey} from "../../actions/surveys";
import {serializeQuestionsArr, deserializeQuestionsArr} from "../../utils/survey";


import "./styles.css";

const SURVEY_INITIAL_STATE = {
  surveyId: null,
  title: "",
  minGroupSize: 1,
  maxGroupSize: 10,
  preferredGroupSize: 7,
  questions: []
};

class QuizForm extends Component {
  constructor(props) {
    super(props);

    const {surveyId, title, status, minGroupSize, maxGroupSize, preferredGroupSize} = this.props.survey;

    this.state = {
      surveyId,
      title,
      status,
      minGroupSize,
      maxGroupSize,
      preferredGroupSize,
      questions: []
    };
  }

  async componentDidMount() {
    const {match: {params}} = this.props;

    if (params && params.surveyId) {
      const surveyId = params.surveyId;
      this.setState({isLoading: true, surveyId});

      try {
        const survey = await this.props.getSurveyById(surveyId);
        console.log(survey);

        const {title, minGroupSize, maxGroupSize, preferredGroupSize, questions} = survey;

        this.setState({
          surveyId,
          title,
          minGroupSize,
          maxGroupSize,
          preferredGroupSize,
          questions: deserializeQuestionsArr(questions)
        });
      } catch (exception) {
        console.log(exception);
      }

      this.setState({isLoading: false});
    }
  }

  validateForm() {
    const {title, minGroupSize, maxGroupSize, preferredGroupSize, questions} = this.state;

    return (
      title.length > 0 && minGroupSize > 0 &&
      maxGroupSize > 0 && maxGroupSize >= minGroupSize &&
      preferredGroupSize > 0 && preferredGroupSize >= minGroupSize &&
      questions.length > 0
    );
  }

  handlePublish = async (surveyId) => {
    await this.props.publishSurvey(surveyId);
    this.props.history.push('/surveys');
  };

  handleSubmit = async event => {
    event.preventDefault();
    await this.saveSurvey();
  };

  saveSurvey = async () => {
    this.setState({isSaving: true});
    const {surveyId, title, minGroupSize, maxGroupSize, preferredGroupSize, questions} = this.state;

    const isCreateOperation = this.isCreateOp(surveyId);
    const survey = {
      title,
      minGroupSize,
      maxGroupSize,
      preferredGroupSize,
      questions: serializeQuestionsArr(questions),
      responses: []
    };

    if (!isCreateOperation) {
      survey.surveyId = surveyId;
    }

    console.log('saved survey', survey);

    await this.props.saveSurvey(survey);
    this.props.history.push('/surveys');

    this.setState({isSaving: false});
  };

  isCreateOp = id => (id === null || typeof id === "undefined");

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleAddNewQuestion = event => {
    event.preventDefault();
    const {questions} = this.state;

    this.setState({questions: [...questions, QuestionBuilderContainer.getNewQuestion()]}, () => {
      console.log(this.state.questions);
    });
  };

  handleUpdateQuestion = (updatedQuestion) => {
    let updatedQuestionIndex = -1;
    const {questions} = this.state;

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].id === updatedQuestion.id) {
        updatedQuestionIndex = i;
        break;
      }
    }

    if (updatedQuestionIndex !== -1) {
      if (questions[updatedQuestionIndex].questionType === updatedQuestion.questionType) {
        updatedQuestion = {...questions[updatedQuestionIndex], ...updatedQuestion};
      } else {
        const {title} = questions[updatedQuestionIndex];
        updatedQuestion = {
          title,
          ...updatedQuestion
        };
      }

      let updatedQuestions = [
        ...questions.slice(0, updatedQuestionIndex),
        updatedQuestion,
        ...questions.slice(updatedQuestionIndex + 1, questions.length)
      ];

      console.log("updated questions", updatedQuestions);

      this.setState({questions: updatedQuestions});
    }
  };

  handleDeleteQuestion = (event, questionId) => {
    event.preventDefault();
    const {questions} = this.state;

    this.setState({questions: questions.filter(obj => obj.id !== questionId)});
  };

  render() {
    const {isLoading, isSaving, minGroupSize, maxGroupSize, preferredGroupSize, questions, surveyId} = this.state;
    if (isLoading) return <h3>Loading...</h3>;

    return (
      <div className="container">
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
            est laborum.
          </p><br/>
          <form onSubmit={this.handleSubmit}>
            <Grid>
              <Row>
                <Col>
                  <FormGroup controlId="title">
                    <ControlLabel>What's the title of your match?</ControlLabel>
                    <HelpBlock>Typically it's the class name</HelpBlock>
                    <FormControl
                      type="text"
                      placeholder="E.g. Title or class"
                      value={this.state.title}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={3}>
                  <FormGroup controlId="minGroupSize">
                    <ControlLabel>Min group size</ControlLabel>
                    <FormControl
                      componentClass="select"
                      onChange={this.handleChange}
                      value={minGroupSize}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col xs={12} md={3}>
                  <FormGroup controlId="maxGroupSize">
                    <ControlLabel>Max group size</ControlLabel>
                    <FormControl
                      componentClass="select"
                      onChange={this.handleChange}
                      value={maxGroupSize}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col xs={12} md={3}>
                  <FormGroup controlId="preferredGroupSize">
                    <ControlLabel>Preferred group size</ControlLabel>
                    <FormControl
                      componentClass="select"
                      onChange={this.handleChange}
                      value={preferredGroupSize}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </FormControl>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="questionBtnContainer">
                <Col>
                  <button className="addQuestion" onClick={this.handleAddNewQuestion}>+</button>
                  <label>Add new question</label>
                </Col>
              </Row>
              {questions.map((question, index) =>
                <Row key={question.id} className="questionFormContainer">
                  <Col>
                    <QuestionBuilderContainer
                      questionNumber={index + 1}
                      question={question}
                      updateQuestion={this.handleUpdateQuestion}
                      deleteQuestion={this.handleDeleteQuestion}
                    />
                  </Col>
                </Row>
              )}
              <Row className="buttonsContainer">
                <Col xs={12} md={4}>
                  <LoaderButton
                    block
                    bsSize="large"
                    disabled={!this.validateForm()}
                    type="button"
                    isLoading={isSaving}
                    text="Publish"
                    loadingText="Publishing…"
                    onClick={() => this.handlePublish(surveyId)}
                  />
                </Col>
                <Col xs={12} mdOffset={2} md={4}>
                  <LoaderButton
                    block
                    bsStyle="success"
                    bsSize="large"
                    disabled={!this.validateForm()}
                    type="submit"
                    isLoading={isSaving}
                    text="Save"
                    loadingText="Saving…"
                  />
                </Col>
              </Row>
            </Grid>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {match: {params}} = ownProps;

  let survey = {...SURVEY_INITIAL_STATE};
  if (params && params.surveyId && state.surveys) {
    survey = state.surveys.collection.find(obj => obj.surveyId === params.surveyId);
  }

  return {survey};
};

const mapDispatchToProps = dispatch => ({
  saveSurvey: (survey) => dispatch(saveSurvey(survey)),
  getSurveyById: (surveyId) => dispatch(getSurveyById(surveyId)),
  publishSurvey: (surveyId) => dispatch(publishSurvey(surveyId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizForm);