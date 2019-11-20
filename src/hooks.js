import React, { useContext } from 'react';
import { VariateContext } from './index';

export const useVariate = (componentName, defaultContent) => {
  const { variate } = useContext(VariateContext);
  const components = variate.components || {};
  const variateComponent = components[componentName] || {};
  const attributes = variateComponent.attributes || {};
  const content = { ...defaultContent, ...attributes };
  return { content, variate };
}