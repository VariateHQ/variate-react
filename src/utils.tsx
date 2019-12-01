import * as debug from './lang/debug';

export const logVariateComponent = (experiments: Array<object>, componentName: string): void => {
  console.groupCollapsed(debug.LOAD_COMPONENT, componentName);
  console.log(debug.LOAD_COMPONENT_EXPERIMENTS);
  console.log(experiments);
  console.groupEnd();
}