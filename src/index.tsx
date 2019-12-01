import React, { createContext, Component } from 'react';
import Variate from '@variate/engine';
import { logVariateComponent } from './utils';

export const VariateContext = createContext({ 
  variate: null 
});

export class VariateProvider extends Component<ProviderPropsType, ProviderStateType> {
  constructor(props: ProviderPropsType) {
    super(props);
    const variate = new Variate(this.props);
    this.state = { variate };
  }

  componentDidMount() {
    const { onViewChange } = this.props;
    const { variate } = this.state;
    onViewChange && onViewChange((audience: object) => {
      variate.initialize(audience, () => {
        this.setState({ variate });
      });
    });
  }

  render() {
    const { variate } = this.state;
    const { children } = this.props;
    return (
      <VariateContext.Provider value={{ variate }}>
        { typeof children === 'function' ? children({ variate }) : children }
      </VariateContext.Provider>
    );
  }
}

export const VariateComponent = ({
  children,
  componentName,
  defaultContent
}: VariateComponentProps) => (
  <VariateContext.Consumer>
    {({ variate }) => {
      const components = variate.components || {};
      const variateComponent = components[componentName] || {};
      const experiments = variateComponent.experiments || {}; 
      const attributes = variateComponent.attributes || {};
      const content = { ...defaultContent, ...attributes };
      variate && variate._options.debug && logVariateComponent(experiments, componentName);
      const props: ComponentReturnInterface = { componentName, content, variate, experiments };
      return children(props);
    }}
  </VariateContext.Consumer>
);

VariateComponent.defaultProps = {
  defaultContent: {}
}

export const useVariate = (componentName: string, defaultContent: object = {}): ComponentReturnInterface => {
  const { variate } = React.useContext(VariateContext);
  const components = variate.components || {};
  const variateComponent = components[componentName] || {};
  const experiments = variateComponent.experiments || {}; 
  const attributes = variateComponent.attributes || {};
  const content = { ...defaultContent, ...attributes };
  variate && variate._options.debug && logVariateComponent(experiments, componentName);
  return { content, variate, componentName, experiments };
};
