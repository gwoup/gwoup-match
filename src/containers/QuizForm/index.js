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
import QuestionContainer from "../../components/Questions/QuestionContainer";
import {saveSurvey, getSurveyById} from "../../actions/surveys";
import {serializeQuestionsArr, deserializeQuestionsArr} from "../../utils/survey";


import "./styles.css";

const SURVEY_INITIAL_STATE = {
  id: null,
  title: "",
  status: "DRAFT",
  minGroupSize: 1,
  maxGroupSize: 10,
  preferredGroupSize: 7,
  questions: []
};

class QuizForm extends Component {
  constructor(props) {
    super(props);

    // FIXME: remove uKey from mutation
    const {id, title, status, minGroupSize, maxGroupSize, preferredGroupSize, uKey} = this.props.survey;

    this.state = {
      id,
      title,
      status,
      minGroupSize,
      maxGroupSize,
      preferredGroupSize,
      questions: [],
      uKey
    };
  }

  async componentDidMount() {
    const {match: {params}} = this.props;

    if (params && params.id) {
      this.setState({isLoading: true});

      try {
        const survey = await this.props.getSurveyById(params.id);
        console.log('getSurveyById', survey);
        const {title, minGroupSize, maxGroupSize, preferredGroupSize, questions} = survey;
        this.setState({
          id: params.id,
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

  handlePublish = () => {
    this.setState({status: 'PUBLISHED'}, async () => {
      await this.saveQuiz();
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    await this.saveQuiz();
  };

  saveQuiz = async () => {
    this.setState({isSaving: true});
    const {id, title, minGroupSize, maxGroupSize, preferredGroupSize, status, uKey, questions} = this.state;

    const isCreateOperation = this.isCreateOp(id);

    const survey = {
      title,
      minGroupSize,
      maxGroupSize,
      preferredGroupSize,
      questions: serializeQuestionsArr(questions),
      status,
      responses: [],
      editors: ["alex.com.ua@gmail.com"],
      uKey: isCreateOperation ? this.getRandomKey(6) : uKey
    };

    if (!isCreateOperation) {
      survey.id = id;
    }

    this.props.saveSurvey(survey);
    this.props.history.push('/quizzes');

    this.setState({isSaving: false});
  };

  isCreateOp = (id) => {
    return id === null
  };

  getRandomKey = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleAddNewQuestion = event => {
    event.preventDefault();
    const {questions} = this.state;

    this.setState({questions: [...questions, QuestionContainer.getNewQuestion()]}, () => {
      console.log(this.state.questions);
    });
  };

  handleUpdateQuestion = (updatedQuestion) => {
    let updatedQuestionIndex = -1;
    const {questions} = this.state;
    console.log("questions has to be updated");

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].id === updatedQuestion.id) {
        updatedQuestionIndex = i;
        break;
      }
    }

    if (updatedQuestionIndex > -1) {
      let updatedQuestions = [
        ...questions.slice(0, updatedQuestionIndex),
        {...questions[updatedQuestionIndex], ...updatedQuestion},
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
    const {isLoading, isSaving, minGroupSize, maxGroupSize, preferredGroupSize, questions} = this.state;
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
                    <QuestionContainer
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
                    onClick={() => this.handlePublish()}
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
  if (params && params.id && state.surveys) {
    survey = state.surveys.find(obj => obj.id === params.id);
  }

  return {survey};
};

const mapDispatchToProps = dispatch => ({
  saveSurvey: (survey) => dispatch(saveSurvey(survey)),
  getSurveyById: (surveyId) => dispatch(getSurveyById(surveyId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizForm);