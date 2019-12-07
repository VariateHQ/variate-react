declare module '@variate/engine';

type ProviderStateType = {
  variate: any
}

type ProviderPropsType = {
  config: object
  debug?: boolean
  tracking?: boolean
  children: any
  onViewChange?: Function
}

type VariateComponentProps = {
  children: any
  componentName: string
  defaultContent?: object
}

type ExperimentType = {
  attributes: object,
  bucket: number,
  experiment: number,
  variation: number
}

interface ComponentReturnInterface {
  componentName: string,
  experiments: Array<ExperimentType>,
  track(args: object): void
  variables: object,
  variate: object,
}

type StylesType = {
  brand: string,
  error: string, 
  warning: string, 
  type: string, 
  message: string
}