import React, { Component, useState } from 'react';
import { Route, Redirect } from 'react-router';
import { Provider, connect, Selector, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './pages/Login';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Flavors from './pages/Flavors';
import Calculator from './pages/Calculator';
import Juices from './pages/Juices';
import Recipe from './pages/Juices/Recipe';
import { ThemeProvider } from "@material-ui/core/styles";

import { clearTheme } from './styles/themes'
import * as store from './framework/redux/ApplicationStore'


const PrivateRoute = ({component: Component, authed, ...rest})=>{
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login'}} />}
    />
  )
}

const App = () => {
  const auth = useSelector((state) => state.auth)
  return (
      

    <ThemeProvider theme={clearTheme}>
      <Layout>
      <Route path='/login' component={Login} />
      <PrivateRoute authed={auth.isSignedIn} path='/flavors' component={Flavors} />

        {/* <Route exact path='/flavors' component={Flavors} /> */}
        <Route path='/calculator' component={Calculator} />
        <Route path='/juices' component={Juices} />
        <Route path='/recipe/:juiceId' component={Recipe} />
        
        
      </Layout>


    </ThemeProvider>



  );
}

export default App;



