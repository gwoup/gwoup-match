import React, {Component} from "react";
import {Auth} from "aws-amplify";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import QuizRow from "../../components/QuizRow/index";
import {getSurveys, deleteSurvey, groupingSurvey} from "../../actions/surveys";
import {routeRefresh} from "../../utils/routes";
import "./index.css";

class Surveys extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      surveys: []
    }
  }

  async componentDidMount() {
    this.setState({isLoading: true});

    const user = await Auth.currentAuthenticatedUser();
    const surveys = await this.props.getSurveys(user.username);

    if(surveys.length === 0) {
      this.props.history.push('/intro');
    }

    this.setState({surveys, isLoading: false});
  }

  handleDeleteQuiz = async surveyId => {
    await this.props.deleteSurvey(surveyId);
    routeRefresh(this.props.history, "/surveys");
  };

  handleGrouping = async surveyId => {
    await this.props.groupingSurvey(surveyId);
    this.props.history.push(`/bematched/groups/${surveyId}`);
  };

  render() {
    const {surveys, isLoading} = this.state;

    return (
      <div className="container">
        <div className="row text-left">
          <Link to="/surveys/new">
            <button className="btn btn-success">Add new Survey</button>
          </Link>
        </div>
        <div>
          {isLoading && <h3>Loading...</h3>}
          {surveys.map(obj =>
            <QuizRow
              title={obj.title}
              status={obj.status}
              questionsNum={obj.questions.length}
              minGroupSize={obj.minGroupSize}
              votesNum={obj.responses.length}
              pin={obj.pin}
              surveyId={obj.surveyId}
              key={obj.surveyId}
              deleteHandler={this.handleDeleteQuiz}
              groupingHandler={this.handleGrouping}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getSurveys: () => dispatch(getSurveys()),
  deleteSurvey: (surveyId) => dispatch(deleteSurvey(surveyId)),
  groupingSurvey: (surveyId) => dispatch(groupingSurvey(surveyId)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Surveys);