import React, {Component} from "react";
import {Auth} from "aws-amplify";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import QuizRow from "../../components/QuizRow/index";
import {getSurveys, deleteSurvey} from "../../actions/surveys";
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

    this.setState({surveys, isLoading: false});
  }

  handleDeleteQuiz = async surveyId => {
    await this.props.deleteSurvey(surveyId);
    routeRefresh(this.props.history, "/surveys");
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
              questionsNum={obj.questionsNum}
              expectedNum={obj.expectedNum}
              votesNum={obj.votesNum}
              pin={obj.pin}
              surveyId={obj.surveyId}
              key={obj.surveyId}
              deleteHandler={this.handleDeleteQuiz}
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
});

export default connect(
  null,
  mapDispatchToProps,
)(Surveys);