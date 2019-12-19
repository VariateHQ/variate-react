import * as debug from './lang/debug';

export const logVariateComponent = (experiments: Array<object>, componentName: string, variateComponent: VariateComponentType): void => {
  console.groupCollapsed(debug.LOAD_COMPONENT, componentName);
  console.log(
    debug.VIEW_EXPERIMENT,
    `https://variate.ca/sites/${variateComponent.siteId}/experiments/${variateComponent.experimentId}`
  );
  console.log(debug.LOAD_COMPONENT_EXPERIMENTS);
  console.log(experiments);
  console.groupEnd();
}