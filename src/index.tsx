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
      segments: {},
    };
    this.activate = this.activate.bind(this);
  }

  componentDidMount() {
    const { onViewChange } = this.props;
    const { variate } = this.state;
    onViewChange &&
      onViewChange((segments: object) => {
        variate.initialize(segments, () => {
          this.setState({ variate });
        });
      });
  }

  activate(newSegments: object) {
    const { segments, variate } = this.state;
    if (JSON.stringify(newSegments) !== JSON.stringify(segments)) {
      setTimeout(() => {
        variate.initialize(newSegments, () => {
          this.setState({ segments: newSegments });
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
          }) : children}
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
      const variables = { ...defaultContent, ...variateComponent.variables };
      variate &&
        variate.__options &&
        variate._options.debug &&
        logVariateComponent(experiments, componentName, variateComponent);
      const props: ComponentReturnType = {
        bucket: variateComponent.bucket,
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
  const variables = { ...defaultContent, ...variateComponent.variables };
  variate &&
    variate.__options &&
    variate._options.debug &&
    logVariateComponent(experiments, componentName, variateComponent);
  return {
    bucket: variateComponent.bucket,
    componentName,
    experiments,
    variables,
    variate,
    track: variate.track,
  };
};
