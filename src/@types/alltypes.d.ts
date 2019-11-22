declare module '@variate/engine';

type ProviderStateType = {
  variate: any
}

type ProviderPropsType = {
  debug: boolean
  children: any,
  onViewChange: Function
}

type VariateComponentProps = {
  children: any,
  componentName: string,
  defaultContent: object
}

type UseVariateReturnType = {
  content: object,
  variate: object 
  componentName: string
}