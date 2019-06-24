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

  buildUserGroup = (group, groupNumber) => {
    if (group.length <= 0) {
      return;
    }

    return (<div key={groupNumber}>
      <h4>Group {groupNumber}</h4>
      {group.map(user => <div key={user.userId}>{user.full_name}</div>)}
      <div className="separate"/>
    </div>);
  };

  getStatusContent = () => {
    const {title, groups, pin} = this.state;

    return (
      <>
        <h3>Students in class</h3>
        <h3><b>{title}</b> - pin <b>{pin}</b></h3>
        <h3>have now been automatically grouped into the following groups<br/>based on their answers:</h3>
        <div className="userGroups">
          {groups.map((group, i) => this.buildUserGroup(group, i+1))}
        </div>
      </>
    );
  };

  render() {
    const {isLoading} = this.state;
    const content = isLoading ? <h3>Loading ...</h3> : this.getStatusContent();

    return (
      <div className="BeMatchedGroups">
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