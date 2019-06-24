import React, {Component} from "react";

import "./styles.css";
import {getSurveyGroups} from "../../actions/surveys";
import {connect} from "react-redux";


class BeMatchedGroups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      isLoading: false,
      groups: []
    };
  }

  async componentDidMount() {
    const {match: {params}} = this.props;

    if (params && params.surveyId) {
      const surveyId = params.surveyId;
      this.setState({surveyId, isLoading: true});

      try {

        const survey = await this.props.getSurveyGroups(surveyId);
        console.log(survey);
        const {title, groups, pin} = survey;

        this.setState({
          title,
          groups,
          pin
        });
      } catch (exception) {
        console.log(exception);
      }
    }

    this.setState({isLoading: false});
  }

  getStatusContent = () => {
    const {title, groups, pin} = this.state;
    return (
      <>
        <h3>Students in class</h3>
        <h3><b>{title}</b> - pin <b>{pin}</b></h3>
        <h4>have now been automatically grouped into the following groups based on their answers:</h4>
        <ul className="userGroups">
          {groups.map(group => group.map((user, i) =>
            <li key={i}>{user.full_name}</li>
          ))}
        </ul>
      </>
    );
  };

  render() {
    const {isLoading} = this.state;
    const content = isLoading ? <h3>Loading ...</h3> : this.getStatusContent();

    return (
      <div className="BeMatchedStatus">
        {content}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getSurveyGroups: (surveyId) => dispatch(getSurveyGroups(surveyId)),
});

export default connect(
  null,
  mapDispatchToProps
)(BeMatchedGroups);