import React from 'react';
import Login from "./Screens/login"
import Home from "./Screens/home"
import {BrowserRouter, Route, Switch} from "react-router-dom"
import "./App.css"

function App() {

  return (
    <div className="main">
      <BrowserRouter>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
