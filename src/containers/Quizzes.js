import React, {Component} from "react";
import "./Quizzes.css";
import {API, graphqlOperation} from "aws-amplify";
import {listQuizs} from "../graphql/queries";
import {deleteQuiz} from "../graphql/mutations";
import QuizRow from "../components/QuizRow/index";

/*
Sample quiz data structure:

const quizzes = [
  {
    id: 1,
    title: 'Math classes grouping',
    uKey: 'QWE 1TY',
    status: 'DRAFT',
    questionsNum: 30,
    votesNum: 99,
    expectedNum: 120
  },
  {
    id: 2,
    title: 'Programming classes',
    uKey: 'BME 2TL',
    status: 'DRAFT',
    questionsNum: 30,
    votesNum: 99,
    expectedNum: 120
  }
];
*/

export default class Quizzes extends Component {

  state = {
    quizzes: []
  };

  async componentDidMount() {
    const result = await API.graphql(graphqlOperation(listQuizs));
    this.setState({quizzes: result.data.listQuizs.items})
  }

  handleDeleteQuiz = async quizId => {
    const {quizzes} = this.state;
    const result = await API.graphql(graphqlOperation(deleteQuiz, {input: {id: quizId}}));
    console.log(result.data.deleteQuiz.id);

    const updatedQuizzes = quizzes.filter(quiz => quiz.id !== result.data.deleteQuiz.id);
    this.setState({quizzes: updatedQuizzes})
  };

  render() {
    const {quizzes} = this.state;
    return (
      <div className="container">
        <div className="row text-left">
          <button className="btn btn-success">Add new Quiz</button>
        </div>

        {quizzes.map(obj =>
          <QuizRow
            title={obj.title}
            status={obj.status}
            questionsNum={obj.questionsNum}
            expectedNum={obj.expectedNum}
            votesNum={obj.votesNum}
            uKey={obj.uKey}
            id={obj.id}
            key={obj.id}
            deleteHandler={this.handleDeleteQuiz}
          />
        )}
      </div>
    );
  }
}
