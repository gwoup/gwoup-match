import React, {Component} from "react";
import {connect} from "react-redux";
import {Col, ControlLabel, FormControl, FormGroup, Grid, Row, HelpBlock} from "react-bootstrap";

import LoaderButton from "../../components/LoaderButton";
import "./index.css";


class BeMatchedBySurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: "",
      surveyTitle: "",
      validationState: null,
      errorMsg: null
    };
  }

  componentDidMount() {
    const {matchingSurvey} = this.props;

    if (typeof matchingSurvey === "undefined" || matchingSurvey === null) {
      this.props.history.push('/bematched');
    } else {
      this.setState({
        pin: matchingSurvey.pin,
        surveyTitle: matchingSurvey.title
      });
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({isFetching: true});
    // const survey = await this.props.getPublishedSurveyByPin(this.state.pin.toUpperCase());
    //
    // if (survey) {
    //   this.setState({
    //     validationState: null,
    //     errorMsg: null,
    //     pin: ""
    //   });
    // } else {
    //   this.setState({
    //     validationState: "error",
    //     errorMsg: "Survey is not available. Plz check your PIN",
    //     pin: ""
    //   });
    // }

    this.setState({isFetching: false});
  };

  isFormValid = () => {
    return this.state.pin.length > 0;
  };

  render() {
    const {surveyTitle, pin} = this.state;

    return (
      <div className="BeMatchedBySurvey">
        <h4>You are answering questions for:</h4>
        <h3><b>{surveyTitle}</b> - pin <b>{pin}</b></h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {matchingSurvey: state.surveys.matchingSurvey}
);

export default connect(
  mapStateToProps
)(BeMatchedBySurvey);
