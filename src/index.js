import React, { createContext, Component } from 'react';
import Variate from '@variate/engine';

import { MUST_HAVE_CHILDREN } from './lang.js';

export const VariateContext = createContext({ variate: null });

export class VariateProvider extends Component {

  constructor(props) {
    super(props);
    const variate = new Variate(this.props);
    this.state = { variate };
    props.initialView && variate.initialize(props.initialView);
    this._viewChanged = this._viewChanged.bind(this);
  }

  _viewChanged(args) {
    const { variate } = this.state;
    variate.initialize(args);
    this.setState({ variate });
  }

  render() {
    const { variate } = this.state;
    const { children } = this.props;
    return (
      <VariateContext.Provider value={{ variate }}>
        {typeof children === 'function' ? 
          children({ viewChanged: this._viewChanged }) : 
          children}
      </VariateContext.Provider>
    )
  }

}

export const VariateComponent = ({
  children,
  componentName,
  defaultContent = {}
}) => (
  <VariateContext.Consumer>
    {({ variate }) => {
      const components = variate.components || {};
      const variateComponent = components[componentName] || {};
      const attributes = variateComponent.attributes || {};
      const content = { ...defaultContent, ...attributes };
      return children({ componentName, content, variate });    
    }}
  </VariateContext.Consumer>
)
