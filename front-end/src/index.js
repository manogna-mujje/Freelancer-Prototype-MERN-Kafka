import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';


import App from './components/app';
import Signup from './components/signup';
import Login from './components/login';
import Profile from './components/profile';
import Home from './components/home';
import PostProject from './components/post-project';
import Project from './components/project';
import reducers from './reducers';
import PropTypes from 'prop-types';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware()
)(createStore);

export const store=createStoreWithMiddleware(reducers);

// store.subscribe(()=> {
//   saveState({
//     session : store.getState().session
//   });
// });

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter> 
      <div> 
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Home} />
          <Route path="/post-project" component={PostProject} />
          <Route path="/profile/:user" component={Profile} />
          <Route path="/projects/:name" component={Project} />
          <Route exact path="/" component={App} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));