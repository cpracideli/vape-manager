import { Box, Container } from '@material-ui/core';
import React, { Component } from 'react';
import BottonNav from './BottonNav';
import Navbar from './Navbar';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <Navbar/>
        <Container>
          <Box m={2} mb={12}>
            {this.props.children}
          </Box>
        </Container>
        <BottonNav />
      </div>
    );
  }
}
