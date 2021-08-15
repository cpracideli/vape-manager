import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Flavors from './pages/Flavors';
import Calculator from './pages/Calculator';
import Juices from './pages/Juices';
import { ThemeProvider } from "@material-ui/core/styles";

import {clearTheme} from './styles/themes'

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

export default (App);