import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import styled from 'styled-components';

import { AboutPage } from './AboutPage';
import { HomePage } from './HomePage';
import { Nav } from './Nav';
import { VariateProvider, routerWithVariate } from './../../src';

import config from './config.json';

const Container = styled.section``;

const history = createBrowserHistory();

const App = () => (
  <VariateProvider 
    debug={true} 
    tracking={true}
    reporter={event => console.log('TRACKED >>>', event)}
    config={config}
    initialView={{
      view: window.location.pathName,
      targeting: {
        country: 'Canada',
        state: 'BC',
      }
    }}>
    { ({ viewChanged }) => {

      history.listen(location => viewChanged({
        view: location.pathName,
        targeting: {
          country: 'Canada',
          state: 'BC',
        }
      }));

      return (
        <Container>
          <Router history={history}>
            <Nav />
            <Route exact path='/' render={HomePage} />
            <Route exact path='/about' render={AboutPage} />
          </Router>
        </Container>
      )
    }}
  </VariateProvider>
);

export default App;