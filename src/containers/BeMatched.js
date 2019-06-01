import React, { Component } from "react";
import "./BeMatched.css";
import { Button } from "react-bootstrap";

export default class BeMatched extends Component {
    constructor(props) {
    super(props);

    this.state = {
      isLoading: null
    };
  }
  
  
  render() {
    return (
      <div className="BeMatched">
        <h1>THE GROUPS FOR #3HG67X</h1>
        <div className="StudentGroups">
          <div>
            <h4>GROUP 1</h4>
            <div>
              <Button className="StudentButton" variant="primary" type="submit">
                Signe Jensen
              </Button>
            </div>
              <div>
              <Button className="StudentButton" variant="primary" type="submit">
                Freja Nørgaard
              </Button>
            </div>
            <div>
              <Button className="StudentButton" variant="primary" type="submit">
                Tobias Oklev
              </Button>
            </div>
          </div>
          <div>
            <h4>GROUP 2</h4>
            <div>
              <Button className="StudentButton" variant="primary" type="submit">
                Alfred Nissen
              </Button>
            </div>
            <div>
              <Button className="StudentButton" variant="primary" type="submit">
                Sarah Fie Jørgov
              </Button>
            </div>
            <div>
              <Button className="StudentButton" variant="primary" type="submit">
                Ann-Katrine Shøv Jansgaard
              </Button>
            </div>
          </div>
          <div>
            <h4>GROUP 3</h4>
            <div>
              <Button className="StudentButton" variant="primary" type="submit">
                Oliver Hørskov
              </Button>
            </div>
            <div>
              <Button className="StudentButton" variant="primary" type="submit">
                Liva Louise Klarplov
              </Button>
            </div>
            <div>
              <Button className="StudentButton" variant="primary" type="submit">
                Sofie Westergaard
              </Button>          
            </div>
          </div>
          <div>
            <h4>GROUP 4</h4>
            <div>
              <Button className="StudentButton" variant="primary" type="submit">
                Camilla Quortrup
              </Button>
            </div>
            <div>
              <Button className="StudentButton" variant="primary" type="submit">
                Anton Sørensen
              </Button>
            </div>
            <div>
              <Button className="StudentButton" variant="primary" type="submit">
                Laurtiz Jensen
              </Button>          
            </div>
          </div>
        </div>
      </div>
    );
  }
}
