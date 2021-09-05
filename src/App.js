import React from 'react';
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import './App.css';
import Home from './container/Home';
import Signin from './container/Singin';
import Signup from './container/Signup';

 

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/Signup" component={Signup}/>
        <Route path="/Signin" component={Signin}/>
      </Switch>
    </Router>
  );
}

export default App;
