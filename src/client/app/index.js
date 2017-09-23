import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Layout from '../layout';
import createReducer from '../reducers';
import Home from '../pages/home';
import { appInitializedAction } from '../actions/app.actions';
import '../styles/global';

const configureStore = (initialState = {}) => {
  const logger = createLogger();
  const middlewares = [
    logger,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  return createStore(
    createReducer(),
    initialState,
    compose(...enhancers),
  );
};

const store = configureStore({});
const Test = () => <h2>Test</h2>;

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/test" component={Test} />
        </Layout>
      </Router>
    </Provider>,
    document.getElementById('app'),
  );

  store.dispatch(appInitializedAction());
};

render();
