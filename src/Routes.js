import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Match from "./containers/Match";
import BeMatched from "./containers/BeMatched";
import Signup from "./containers/Signup";
import ResetPassword from "./containers/ResetPassword";
import Profile from "./containers/Profile";
import ChangePassword from "./containers/ChangePassword";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";


export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AuthenticatedRoute path="/match" exact component={Match} props={childProps} />
    <AuthenticatedRoute path="/bematched" exact component={BeMatched} props={childProps} />
    <AuthenticatedRoute path="/profile" exact component={Profile} props={childProps} />
    <AuthenticatedRoute path="/profile/password" exact component={ChangePassword} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/login/reset" exact component={ResetPassword}  props={childProps}/>
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;

