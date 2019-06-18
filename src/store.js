import {createStore, applyMiddleware} from "redux";
import logger from "redux-logger";
import reducer from "./reducers/index";

export default function configureStore() {
  const initialState = {
    surveys: []
  };

  const persistedState =
    localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : initialState;
  let store = createStore(reducer, persistedState, applyMiddleware(logger));

  store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
  });

  return store;
}
