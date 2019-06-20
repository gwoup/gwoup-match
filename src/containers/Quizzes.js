import React, {Component} from "react";
import "./Quizzes.css";
import {graphqlOperation} from "aws-amplify";
import {Connect} from "aws-amplify-react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {listSurveys} from "../graphql/queries";
import {deleteSurvey} from "../graphql/mutations";
import {onCreateOrDeleteSurvey} from "../graphql/customSubscriptions";
import QuizRow from "../components/QuizRow/index";
import {initSurveys} from "../actions/surveys";


class Quizzes extends Component {
  surveyDeleteMutation = null;

  constructor(props) {
    super(props);

    // this.subscription = undefined;
  }

  handleDeleteQuiz = quizId => {
    this.surveyDeleteMutation({input: {id: quizId}});
  };

  handleSubscriptions = (prev, newData) => {
    if (newData.onCreateSurvey) {
      const surveys = [...prev.listSurveys.items];
      console.log(`survey "${newData.onCreateSurvey.title}" created`);
      prev.listSurveys.items = [newData.onCreateSurvey, ...surveys];
    }

    if (newData.onDeleteSurvey) {
      console.log(`survey "${newData.onDeleteSurvey.title}" deleted`);
      prev.listSurveys.items = prev.listSurveys.items.filter(item => item.id !== newData.onDeleteSurvey.id);
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
            pin={obj.pin}
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
            <button className="btn btn-success">Add new Survey</button>
          </Link>
        </div>
        <Connect
          query={graphqlOperation(listSurveys)}
          mutation={graphqlOperation(deleteSurvey)}
          subscription={graphqlOperation(onCreateOrDeleteSurvey)}
          onSubscriptionMsg={this.handleSubscriptions}>
          {({data, loading, error, mutation}) => {
            this.surveyDeleteMutation = mutation;

            if (typeof data == "undefined" || typeof data.listSurveys == "undefined") {
              data = {listSurveys: []};
            }

            const {listSurveys} = data;
            const surveys = listSurveys.items && listSurveys.items.length ? listSurveys.items : [];

            console.log(surveys);

            this.props.initSurveys(surveys);

            if (error) return <h3>Error</h3>;
            if (loading) return <h3>Loading...</h3>;
            return (<ListView quizzes={surveys}/>);
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