import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './page/Login';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
