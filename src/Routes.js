import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Match from "./containers/Match";
import Quizzes from "./containers/Quizzes";
import QuizForm from "./containers/QuizForm";
import BeMatched from "./containers/BeMatched";
import BeMatchedBySurvey from "./containers/BeMatchedBySurvey/index";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";



export default ({ childProps }) =>
  <Switch>
    <UnauthenticatedRoute path="/" exact component={Home} props={childProps} />
    <AuthenticatedRoute path="/quizzes/new" exact component={QuizForm} props={childProps} />
    <AuthenticatedRoute path="/quizzes/:id" component={QuizForm} props={childProps} />
    <AuthenticatedRoute path="/quizzes" exact component={Quizzes} props={childProps} />
    <AuthenticatedRoute path="/bematched" exact component={BeMatched} props={childProps} />
    <AuthenticatedRoute path="/bematched/survey" exact component={BeMatchedBySurvey} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;

