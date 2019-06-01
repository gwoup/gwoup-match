import React, { Component } from "react";
import "./Match.css";
import { Form,FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default class Match extends Component {
    constructor(props) {
    super(props);

    this.state = {
      isLoading: null
    }
  }

  render() {
    return (
      <div className="Match">
        <h1>LET THE MATCHING BEGIN FOR GROUP #3HG67X</h1>
        <div className="Questions">
          <form>
            <FormGroup controlId="Q1">
              <ControlLabel>Spørgsmål 1 (skala 1-10)</ControlLabel>
              <FormControl type="textarea" rows="2" placeholder="Text" />
            </FormGroup>
            <FormGroup controlId="Q2">
              <ControlLabel>Spørgsmål 2 (skala 1-10)</ControlLabel>
              <FormControl type="textarea" rows="2" placeholder="Text" />
            </FormGroup>
            <FormGroup controlId="Q3">
              <ControlLabel>Spørgsmål 3 (skala 1-10)</ControlLabel>
              <FormControl type="textarea" rows="2" placeholder="Text" />
            </FormGroup>
            <FormGroup controlId="Q4">
              <ControlLabel>Spørgsmål 4 (skala 1-10)</ControlLabel>
              <FormControl type="textarea" rows="2" placeholder="Text" />
            </FormGroup>
            <FormGroup controlId="Q5">
              <ControlLabel>Spørgsmål 5 (skala 1-10)</ControlLabel>
              <FormControl type="textarea" rows="2" placeholder="Text" />
            </FormGroup>
            <Button className="AddQ" variant="primary" type="submit">
            +
            </Button>
          </form>          
        </div>
          <Button className="StartMatchButton" variant="primary" type="submit">
            Start matching
          </Button>
           <Button className="SaveButton" variant="primary" type="submit">
            Gem spørgsmål
          </Button>
      </div>
    );
  }
}