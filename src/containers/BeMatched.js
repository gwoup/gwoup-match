import React, {Component} from "react";
import "./BeMatched.css";
import {Col, ControlLabel, FormControl, FormGroup, Grid, Row, HelpBlock} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import {getPublishedSurveyByPin} from "../actions/surveys";
import {connect} from "react-redux";


class BeMatched extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pin: '',
      isFetching: false,
      validationState: null,
      errorMsg: null
    };
  }

  handlePinChange = event => {
    this.setState({pin: event.target.value});
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({isFetching: true});
    const survey = await this.props.getPublishedSurveyByPin(this.state.pin.toUpperCase());

    if(survey) {
      this.setState({
        validationState: null,
        errorMsg:null,
        pin: ""
      });
    } else {
      this.setState({
        validationState: "error",
        errorMsg:"Survey is not available. Plz check your PIN",
        pin: ""
      });
    }

    this.setState({isFetching: false});
  };

  isFormValid = () => {
    return this.state.pin.length > 0;
  };

  render() {
    const {isFetching, validationState, errorMsg} = this.state;

    return (
      <div className="BeMatched">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <form onSubmit={this.handleSubmit} className="form">
          <Grid>
            <Row>
              <Col mdOffset={4} md={4} xs={12}>
                <FormGroup controlId="pin" validationState={validationState}>
                  <ControlLabel>Enter PIN for the class</ControlLabel>
                  <FormControl
                    type="text"
                    value={this.state.pin}
                    onChange={this.handlePinChange}
                  />
                  <HelpBlock>{errorMsg}</HelpBlock>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="text-center" mdOffset={4} md={4} xs={12}>
                <LoaderButton
                  block
                  bsStyle="success"
                  disabled={!this.isFormValid()}
                  type="submit"
                  isLoading={isFetching}
                  text="Go"
                  loadingText="Authorizing…"
                />
              </Col>
            </Row>
          </Grid>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getPublishedSurveyByPin: (pin) => dispatch(getPublishedSurveyByPin(pin)),
});

export default connect(
  null,
  mapDispatchToProps
)(BeMatched);
