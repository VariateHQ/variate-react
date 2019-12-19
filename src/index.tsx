import React, { createContext, Component } from 'react';
import Variate from '@variate/engine';
import { logVariateComponent } from './utils';
import { INVALID_COMPONENT_NAME } from './lang/warn';
import version from './lang/version';

export const VariateContext = createContext({
  variate: null,
});

export class VariateProvider extends Component<
  ProviderPropsType,
  ProviderStateType
> {
  constructor(props: ProviderPropsType) {
    super(props);
    props.debug && version();
    const variate = new Variate(this.props);
    this.state = {
      variate,
      audience: {},
    };
    this.activate = this.activate.bind(this);
  }

  componentDidMount() {
    const { onViewChange } = this.props;
    const { variate } = this.state;
    onViewChange &&
      onViewChange((audience: object) => {
        variate.initialize(audience, () => {
          this.setState({ variate });
        });
      });
  }

  activate(target: object) {
    const { audience, variate } = this.state;
    if (JSON.stringify(target) !== JSON.stringify(audience)) {
      setTimeout(() => {
        variate.initialize(audience, () => {
          this.setState({ audience: target });
        });
      }, 0);
    }
  }

  render() {
    const { variate } = this.state;
    const { children } = this.props;
    return (
      <VariateContext.Provider value={{ variate }}>
        {typeof children === 'function'
          ? children({
              activate: this.activate,
              track: variate.track,
              variate,
            })
          : children}
      </VariateContext.Provider>
    );
  }
}

export const VariateComponent = ({
  children,
  componentName,
  defaultContent,
}: VariateComponentProps) => (
  <VariateContext.Consumer>
    {({ variate }) => {
      typeof componentName !== 'string' && console.warn(INVALID_COMPONENT_NAME);
      const components = variate.components || {};
      const variateComponent = components[componentName] || {};
      const experiments = variateComponent.experiments || {};
      const attributes = variateComponent.attributes || {};
      const variables = { ...defaultContent, ...attributes };
      variate &&
        variate.__options &&
        variate._options.debug &&
        logVariateComponent(experiments, componentName);
      const props: ComponentReturnType = {
        componentName,
        experiments,
        variables,
        variate,
        track: variate.track,
      };
      return children(props);
    }}
  </VariateContext.Consumer>
);

VariateComponent.defaultProps = {
  defaultContent: {},
};

export const useVariate = (
  componentName: string,
  defaultContent: object = {},
): ComponentReturnType => {
  const { variate } = React.useContext(VariateContext);
  typeof componentName !== 'string' && console.warn(INVALID_COMPONENT_NAME);
  const components = variate.components || {};
  const variateComponent = components[componentName] || {};
  const experiments = variateComponent.experiments || {};
  const attributes = variateComponent.attributes || {};
  const variables = { ...defaultContent, ...attributes };
  variate &&
    variate.__options &&
    variate._options.debug &&
    logVariateComponent(experiments, componentName);
  return {
    componentName,
    experiments,
    variables,
    variate,
    track: variate.track,
  };
};
