import React from 'react';

import config from './config.json';

import { VariateProvider, VariateComponent } from '../../src';

import Hero from './Hero';

console.log(config);

const App = () => (
  <VariateProvider 
    debug={true} 
    tracking={true}
    reporter={event => console.log(event)}
    config={config}>

    <Hero />

  </VariateProvider>
);

export default App;