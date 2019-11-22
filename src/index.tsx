import React, { createContext, Component } from 'react';
import Variate from '@variate/engine';

type ProviderStateType = {
  variate: any
}

type ProviderPropsType = {
  debug: boolean
  children: any,
  onViewChange: Function
}

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
        { children }
      </VariateContext.Provider>
    );
  }
}

type VariateComponentProps = {
  children: any,
  componentName: string,
  defaultContent: object
}

export const VariateComponent = ({
  children,
  componentName,
  defaultContent = {},
}: VariateComponentProps) => (
  <VariateContext.Consumer>
    {({ variate }) => {
      const components = variate.components || {};
      const variateComponent = components[componentName] || {};
      const attributes = variateComponent.attributes || {};
      const content = { ...defaultContent, ...attributes };
      return children({ componentName, content, variate });
    }}
  </VariateContext.Consumer>
);

export const useVariate = (componentName: string, defaultContent: object) => {
  const { variate } = React.useContext(VariateContext);
  const components = variate.components || {};
  const variateComponent = components[componentName] || {};
  const attributes = variateComponent.attributes || {};
  const content = { ...defaultContent, ...attributes };
  return { content, variate };
}
