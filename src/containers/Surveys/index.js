import React, {Component} from "react";
import {Auth} from "aws-amplify";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import QuizRow from "../../components/QuizRow/index";
import {getSurveys} from "../../actions/surveys";
import "./index.css";

class Surveys extends Component {
  constructor(props) {
    super(props);

    // this.subscription = undefined;
    this.state = {
      surveys: []
    }
  }

  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser();
    const surveys = await this.props.getSurveys(user.username);
    this.setState({surveys});
  }

  handleDeleteQuiz = surveyId => {
    // this.surveyDeleteMutation({input: {id: quizId}});
  };

  // handleSubscriptions = (prev, newData) => {
  //   if (newData.onCreateSurvey) {
  //     const surveys = [...prev.listSurveys.items];
  //     console.log(`survey "${newData.onCreateSurvey.title}" created`);
  //     prev.listSurveys.items = [newData.onCreateSurvey, ...surveys];
  //   }
  //
  //   if (newData.onDeleteSurvey) {
  //     console.log(`survey "${newData.onDeleteSurvey.title}" deleted`);
  //     prev.listSurveys.items = prev.listSurveys.items.filter(item => item.id !== newData.onDeleteSurvey.id);
  //   }
  //
  //   return prev;
  // };

  render() {
    const {surveys} = this.state;

    console.log(surveys);

    return (
      <div className="container">
        <div className="row text-left">
          <Link to="/quizzes/new">
            <button className="btn btn-success">Add new Survey</button>
          </Link>
        </div>
        <div>
          {/*{surveys.map(obj =>*/}
          {/*  <QuizRow*/}
          {/*    title={obj.title}*/}
          {/*    status={obj.status}*/}
          {/*    questionsNum={obj.questionsNum}*/}
          {/*    expectedNum={obj.expectedNum}*/}
          {/*    votesNum={obj.votesNum}*/}
          {/*    pin={obj.pin}*/}
          {/*    id={obj.id}*/}
          {/*    key={obj.id}*/}
          {/*    deleteHandler={this.handleDeleteQuiz}*/}
          {/*  />*/}
          {/*)}*/}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getSurveys: (ownerId) => dispatch(getSurveys(ownerId)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Surveys);