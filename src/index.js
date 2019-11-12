import React, { createContext } from 'react';
import Variate from '@variate/engine';

import { MUST_HAVE_CHILDREN } from './lang.js';

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

  const variate = new Variate({
    debug,
    tracking,
    reporter,
    config,
    reporter
  }); 

  return (
    <Provider value={{
      config,
      debug,
      reporter,
      tracking,
      variate
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
        const bucket = props.variate.getMainTrafficBucket();
        return children({ ...props, componentName, content });    
      }}
    </Consumer>
  )
}



