import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Intro from "./containers/Intro/index";
import Surveys from "./containers/Surveys/index";
import QuizForm from "./containers/QuizForm";
import BeMatched from "./containers/BeMatched";
import BeMatchedBySurvey from "./containers/BeMatchedBySurvey/index";
import BeMatchedStatus from "./containers/BeMatchedStatus/index";
import BeMatchedGroups from "./containers/BeMatchedGroups/index";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";



export default ({ childProps }) =>
  <Switch>
    <UnauthenticatedRoute path="/" exact component={Home} props={childProps} />
    <AuthenticatedRoute path="/intro" exact component={Intro} props={childProps} />
    <AuthenticatedRoute path="/surveys/new" exact component={QuizForm} props={childProps} />
    <AuthenticatedRoute path="/surveys/:surveyId" component={QuizForm} props={childProps} />
    <AuthenticatedRoute path="/surveys" exact component={Surveys} props={childProps} />
    <AuthenticatedRoute path="/bematched" exact component={BeMatched} props={childProps} />
    <AuthenticatedRoute path="/bematched/survey" exact component={BeMatchedBySurvey} props={childProps} />
    <AuthenticatedRoute path="/bematched/status/:surveyId" exact component={BeMatchedStatus} props={childProps} />
    <AuthenticatedRoute path="/bematched/groups/:surveyId" exact component={BeMatchedGroups} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;

