import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Match from "./containers/Match";
import BeMatched from "./containers/BeMatched";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";


export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/match" exact component={Match} props={childProps} />
    <AppliedRoute path="/bematched" exact component={BeMatched} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;

