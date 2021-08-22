import React, { Component, useState } from 'react';
import { Route } from 'react-router';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Flavors from './pages/Flavors';
import Calculator from './pages/Calculator';
import Juices from './pages/Juices';
import { ThemeProvider } from "@material-ui/core/styles";

import { clearTheme } from './styles/themes'

import { googleOAuth2 } from './actions/google'
import { GoogleLogout, GoogleLogin } from 'react-google-login';
import { Box } from '@material-ui/core';
import GoogleAuth from './components/GoogleAuth';
//import GoogleAuth from './components/GoogleAuth2';

const clientId = '150401981001-6484c0p7tv6lg5q5jivg4obs4ql25kmt.apps.googleusercontent.com';

const App = () => {

  return (
      

    <ThemeProvider theme={clearTheme}>
      <Layout>
        <Route exact path='/flavors' component={Flavors} />
        <Route path='/calculator' component={Calculator} />
        <Route path='/juices' component={Juices} />
      </Layout>


    </ThemeProvider>



  );
}

export default App;



