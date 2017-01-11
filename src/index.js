import React from 'react';
import { Router, Route, hashHistory, Redirect } from 'react-router';
import ReactDOM from 'react-dom';
import App from './components/App';
import Hammer from './components/Hammer';
import Piano from './components/Piano';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="hammer" component={Hammer} />
      <Route path="piano" component={Piano} />
      <Route path="*" component={Hammer}>
        <Redirect from="*" to="/hammer" />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
