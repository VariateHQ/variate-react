import * as debug from './lang/debug';

export const logVariateComponent = (experiments: Array<object>, componentName: string, options: object): void => {
  console.groupCollapsed(debug.LOAD_COMPONENT, componentName);
  console.log(
    debug.VIEW_EXPERIMENT,
    // `https://variate.ca/sites/${options.siteId}/experiments/${options.experimentId}`
  );
  console.log(debug.LOAD_COMPONENT_EXPERIMENTS);
  console.log(experiments);
  console.groupEnd();
}