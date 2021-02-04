import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Navigation from './components/Navigation'
import CreateRoom from './components/CreateRoom'
import VoteUser from './components/VoteUser'
import JoinRoom from './components/JoinRoom';
import ResultRoom from './components/ResultRoom';

function App() {
  return (
    <Router>
      <Navigation/>
      <div className="container p-4">
        <Route path="/create" component={CreateRoom} />
        <Route path="/join" component={JoinRoom} />
        <Route path="/user/:id" component={VoteUser} />
        <Route path="/result/:id" component={ResultRoom} />
      </div>
    </Router>
  );
}

export default App;
