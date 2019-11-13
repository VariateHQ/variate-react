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
  pageview = false,
  tracking = false
}) => {

  const variate = new Variate({
    debug,
    tracking,
    reporter,
    config,
    reporter,
    pageview
  });

  return (
    <Provider value={{ variate }}>
      {children}
    </Provider>
  )
}

export const VariateComponent = ({
  children,
  componentName,
  defaultContent
}) => (
  <Consumer>
    {({ variate }) => {

      variate.initialize({
        view: '/$',
        targeting: {
            country: 'Canada',
            state: 'BC',
        }
      });

      const variateComponent = variate.components[componentName] || {};
      const attributes = variateComponent.attributes || {};
      const content = { ...defaultContent, ...attributes };

      return children({ componentName, content, variate });    
    }}

  </Consumer>
)



