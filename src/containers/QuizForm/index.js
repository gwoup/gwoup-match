import React, {Component} from "react";
import {
  HelpBlock,
  FormGroup,
  Row,
  Col,
  Grid,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import {API, graphqlOperation} from "aws-amplify";
import {getQuiz} from "../../graphql/queries";
import {createQuiz, deleteQuiz, updateQuiz} from "../../graphql/mutations";

import "./styles.css";

export default class QuizForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      id: null,
      title: "",
      status: "DRAFT",
      minGroupSize: 1,
      maxGroupSize: 10,
      preferredGroupSize: 7
    };
  }

  async componentDidMount() {
    const {match: {params}} = this.props;

    if (params.id) {
      const id = params.id;
      const result = await API.graphql(graphqlOperation(getQuiz, {id}));

      if (result.data.getQuiz) {
        console.log('componentDidMount');
        const {title, minGroupSize, maxGroupSize, preferredGroupSize} = result.data.getQuiz;
        this.setState({
          id,
          title,
          minGroupSize,
          maxGroupSize,
          preferredGroupSize
        });
      }
    }
  }

  validateForm() {
    const {title, minGroupSize, maxGroupSize, preferredGroupSize} = this.state;
    return (
      title.length > 0 && minGroupSize > 0 &&
      maxGroupSize > 0 && maxGroupSize >= minGroupSize && preferredGroupSize > 0 && preferredGroupSize >= minGroupSize
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
    this.setState({isLoading: true});
    const {id, title, minGroupSize, maxGroupSize, preferredGroupSize, status} = this.state;

    try {
      const graphQLop = (id === null) ? createQuiz : updateQuiz;
      const input = {
        id,
        title,
        questions: [],
        minGroupSize,
        maxGroupSize,
        preferredGroupSize,
        status,
        responses: [],
        editors: ["alex.com.ua@gmail.com"],
        uKey: "3QAED5"
      };
      await API.graphql(graphqlOperation(graphQLop, {input}));
      this.props.history.push('/quizzes');
    } catch (e) {
      console.log(e);
    }

    this.setState({isLoading: false});
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  renderForm() {
    const {minGroupSize, maxGroupSize, preferredGroupSize} = this.state;
    return (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p><br/>
        <form onSubmit={this.handleSubmit}>
          <Grid>
            <Row>
              <Col>
                <FormGroup controlId="title" bsSize="large">
                  <ControlLabel>What's the title of your match?</ControlLabel>
                  <HelpBlock>Typically it's the class name</HelpBlock>
                  <FormControl
                    autoFocus
                    type="text"
                    placeholder="E.g. Title or class"
                    value={this.state.title}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Grid>
          <Grid>
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
          </Grid>
          <br/>
          <p>... [questions placeholder]...</p>
          <br/>
          <Grid>
            <Row>
              <Col xs={12} md={4}>
                <LoaderButton
                  block
                  bsSize="large"
                  disabled={!this.validateForm()}
                  type="button"
                  isLoading={this.state.isLoading}
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
                  isLoading={this.state.isLoading}
                  text="Save"
                  loadingText="Saving…"
                />
              </Col>
            </Row>
          </Grid>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        {this.renderForm()}
      </div>
    );
  }
}
