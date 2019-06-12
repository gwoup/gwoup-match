import React, {Component} from "react";
import "./Quizzes.css";
import QuizRow from "../components/QuizRow/index"

const quizzes = [
  {id:1, title: 'Math classes grouping', uKey: 'QWE 1TY', status: 'DRAFT', questionsNum: 30, votesNum: 99, expectedNum: 120},
  {id:2, title: 'Programming classes', uKey: 'BME 2TL', status: 'DRAFT', questionsNum: 30, votesNum: 99, expectedNum: 120},
  {id:3, title: 'Test 1', uKey: 'DFV 89S', status: 'DRAFT', questionsNum: 30, votesNum: 99, expectedNum: 120}
];

export default class Quizzes extends Component {
  render() {
    return (
      <div className="container">
        <div className="row text-left">
          <button className="btn btn-success">Add new Quiz</button>
        </div>

        {quizzes.map((o, i) =>
          <QuizRow
            title={o.title}
            status={o.status}
            questionsNum={o.questionsNum}
            expectedNum={o.expectedNum}
            votesNum={o.votesNum}
            uKey={o.uKey}
            key={o.id}/>
        )}
      </div>
    );
  }
}
