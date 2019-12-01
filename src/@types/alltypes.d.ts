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
  content: object,
  variate: object 
  componentName: string,
  experiments: Array<ExperimentType>
}

type StylesType = {
  brand: string,
  error: string, 
  warning: string, 
  type: string, 
  message: string
}