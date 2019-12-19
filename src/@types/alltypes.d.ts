declare module '@variate/engine';

type ProviderStateType = {
  variate: any
  segments: object
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
  attributes: object
  bucket: number
  experiment: number
  variation: number
}

type ComponentReturnType = {
  bucket: number,
  componentName: string
  experiments: Array<ExperimentType>
  track(args: any): boolean
  variables: object
  variate: object
}

type StylesType = {
  brand: string
  error: string 
  warning: string 
  type: string 
  message: string
}