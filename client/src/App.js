import React from 'react';
import Game from './pages/Game.js';
import { HashRouter, Route } from 'react-router-dom';
import Welcome from './pages/Welcome.js';
import Queue from './pages/Queue.js';
import End from './pages/End.js';

export default function App() {
  return (
    <HashRouter>
      <Route path='/' component={Welcome} exact={true}/>
      <Route path='/game' component={Game} />
      <Route path='/queue' component={Queue} />
      <Route path='/end' component={End} />
    </HashRouter>
  );
};
