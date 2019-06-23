import React, {Component} from "react";

import "./styles.css";
import {getSurveyStatusById} from "../../actions/surveys";
import {connect} from "react-redux";


class BeMatchedStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: "",
      title: "",
      answersNumber: 0
    };
  }

  componentDidMount() {
    const {match: {params}} = this.props;

    if (params && params.surveyId) {
      const surveyId = params.surveyId;
      this.setState({surveyId});

      this.getStatusData(surveyId);

      this.waitStatusUpdateTimer = setInterval(
        () => {
          this.getStatusData(surveyId);
        }, 20000
      );
    }
  }

  getStatusData = async (surveyId) => {
    try {

      const survey = await this.props.getSurveyStatusById(surveyId);
      const {title, minGroupSize, maxGroupSize, preferredGroupSize, pin, answersNumber} = survey;

      this.setState({
        title,
        minGroupSize,
        maxGroupSize,
        preferredGroupSize,
        pin,
        answersNumber
      });
    } catch (exception) {
      console.log(exception);
    }
  };

  componentWillUnmount() {
    clearInterval(this.waitStatusUpdateTimer);
  }

  render() {
    const {title, pin, answersNumber} = this.state;

    return (
      <div className="BeMatchedStatus">
        <h3><b>{title}</b> - pin <b>{pin}</b></h3>
        <h3>Currently there are</h3>
        <h3 className="respondentsCounter">{answersNumber}</h3>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getSurveyStatusById: (surveyId) => dispatch(getSurveyStatusById(surveyId)),
});

export default connect(
  null,
  mapDispatchToProps
)(BeMatchedStatus);