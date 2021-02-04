import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Navigation from './components/Navigation'
//import NotesList from './components/NotesList'
import CreateRoom from './components/CreateRoom'
import VoteUser from './components/VoteUser'
import JoinRoom from './components/JoinRoom';
//import CreateUser from './components/CreateUser'

function App() {
  return (
    <Router>
      <Navigation/>

      <div className="container p-4">

        <Route path="/create" component={CreateRoom} />
        <Route path="/join" component={JoinRoom} />
        <Route path="/user/:id" component={VoteUser} />

      </div>
    </Router>
  );
}

export default App;
