import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Home from './container/Home';
import Signin from './container/Singin';
import Signup from './container/Signup';
import PrivateRoute from './component/Private/privateRoute';
import { useDispatch, useSelector } from 'react-redux'
import { isUserLoggedIn, getIntialData } from './store/action'
import Products from './container/Products';
import Orders from './container/Orders';
import Category from './container/Category';




function App() {

  const auth = useSelector(state => state.auth)

  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getIntialData())
  },[])

  return (

    <Switch>
      <PrivateRoute path="/" exact component={Home} />
      <PrivateRoute path="/category"  component={Category} />
      <PrivateRoute path="/products" component={Products} />
      <PrivateRoute path="/orders" component={Orders} />


      <Route path="/Signup" component={Signup} />
      <Route path="/Signin" component={Signin} />
    </Switch>

  );
}

export default App;
