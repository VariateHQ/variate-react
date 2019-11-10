import React, { createContext } from 'react';
import Variate from '@variate/engine';

import { MUST_HAVE_CHILDREN } from './lang.js';

const variate = new Variate({
  debug: true
});

const { Provider, Consumer } = createContext({
  env: null,
  debug: false
});
 
export const VariateProvider = ({ 
  children,
  config = {},
  debug = false,
  reporter = false,
  tracking = false
}) => {
  return (
    <Provider value={{
      config,
      debug,
      reporter,
      tracking
    }}>
      {children}
    </Provider>
  )
}

export const VariateComponent = ({
  children,
  componentName,
  defaultContent
}) => {

  const content = defaultContent;

  return (
    <Consumer>
      {props => {
        return children({ ...props, componentName, content });    
      }}
    </Consumer>
  )
}



