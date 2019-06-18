import React, {Component} from "react";
import "./Quizzes.css";
import {graphqlOperation} from "aws-amplify";
import {Connect} from "aws-amplify-react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {listQuizzes} from "../graphql/queries";
import {deleteQuiz} from "../graphql/mutations";
import {onCreateOrDeleteQuiz} from "../graphql/customSubscriptions";
import QuizRow from "../components/QuizRow/index";
import {initSurveys} from "../actions/surveys";


class Quizzes extends Component {
  quizDeleteMutation = null;

  constructor(props) {
    super(props);

    this.subscription = undefined;
  }

  handleDeleteQuiz = quizId => {
    this.quizDeleteMutation({input: {id: quizId}});
  };

  handleSubscriptions = (prev, newData) => {
    if (newData.onCreateQuiz) {
      const quizzes = [...prev.listQuizzes.items];
      prev.listQuizzes.items = [newData.onCreateQuiz, ...quizzes];
    }

    if (newData.onDeleteQuiz) {
      console.log(`quiz "${newData.onDeleteQuiz.title}" deleted`);
      prev.listQuizzes.items = prev.listQuizzes.items.filter(item => item.id !== newData.onDeleteQuiz.id);
    }

    return prev;
  };

  // FIXME
  // componentWillUnmount() {
  //   this.subscription.unsubscribe();
  // }

  render() {
    const ListView = ({quizzes}) => (
      <div>
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

    return (
      <div className="container">
        <div className="row text-left">
          <Link to="/quizzes/new">
            <button className="btn btn-success">Add new Quiz</button>
          </Link>
        </div>
        <Connect
          query={graphqlOperation(listQuizzes)}
          mutation={graphqlOperation(deleteQuiz)}
          subscription={graphqlOperation(onCreateOrDeleteQuiz)}
          onSubscriptionMsg={this.handleSubscriptions}>
          {({data, loading, error, mutation}) => {
            this.quizDeleteMutation = mutation;

            if (typeof data == "undefined" || typeof data.listQuizzes == "undefined") {
              data = {listQuizzes: []};
            }

            const {listQuizzes} = data;
            const surveys = listQuizzes.items && listQuizzes.items.length ? listQuizzes.items : [];
            this.props.initSurveys(surveys);

            if (error) return <h3>Error</h3>;
            if (loading || !listQuizzes) return <h3>Loading...</h3>;
            return (<ListView quizzes={listQuizzes.items && listQuizzes.items.length ? listQuizzes.items : []}/>);
          }}
        </Connect>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  initSurveys: (surveys) => dispatch(initSurveys(surveys)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Quizzes);