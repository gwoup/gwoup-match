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
      answersNumber: 0,
      isLoading: false
    };
  }

  async componentDidMount() {
    const {match: {params}} = this.props;

    if (params && params.surveyId) {
      const surveyId = params.surveyId;
      this.setState({surveyId, isLoading: true});

      await this.getStatusData(surveyId);

      this.waitStatusUpdateTimer = setInterval(
        () => {
          this.getStatusData(surveyId);
        }, 20000
      );
    }

    this.setState({isLoading: false});
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

  getStatusContent = () => {
    const {title, pin, answersNumber} = this.state;

    return (
      <>
        <h3><b>{title}</b> - pin <b>{pin}</b></h3>
        <h3>Currently there are</h3>
        <h3 className="respondentsCounter">{answersNumber}</h3>
        <div>other students have answered</div>
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
  getSurveyStatusById: (surveyId) => dispatch(getSurveyStatusById(surveyId)),
});

export default connect(
  null,
  mapDispatchToProps
)(BeMatchedStatus);