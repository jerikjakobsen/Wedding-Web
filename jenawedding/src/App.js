import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import Home from './Screens/home'
import Weddingparty from './Screens/weddingpartyscr'
import Rsvp from './Screens/rsvp'


//Add Blog

function App() {
  return (
    <BrowserRouter>
      <div className='navbar'>
        <h5 style={{fontSize: '48px'}}>Matthew & Jenafer</h5>
        <ul>
          <li><Link to ='/'>Home</Link></li>
          <li><Link to='/weddingparty'>Wedding Party</Link></li>
          <li><Link to='/rsvp'>RSVP</Link></li>
        </ul>
      </div>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/weddingparty'>
          <Weddingparty />
        </Route>
        <Route path='/rsvp'>
          <Rsvp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
