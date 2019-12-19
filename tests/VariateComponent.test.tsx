import React from 'react';
import { mount } from 'enzyme';

jest.spyOn(global.console, 'warn');

// Mock the variate engine
jest.mock('@variate/engine');

import { INVALID_COMPONENT_NAME } from './../src/lang/warn';
import { VariateProvider, VariateComponent } from '../src/index';
import Variate from '@variate/engine';

describe('VariateComponent', () => {

  let mockRenderProps: any;
  let mockVariateInitialize: any;
  let mockConsoleWarn: any;
  let mockConsoleDebug: any; 

  beforeEach(() => {
    Variate.mockClear();
    mockRenderProps = jest.fn();
    mockVariateInitialize = Variate.prototype.initialize = jest.fn();
    mockVariateInitialize.__options = { debug: true };
    mockConsoleWarn = jest.spyOn(global.console, 'warn');
    mockConsoleDebug = jest.spyOn(global.console, 'debug');
  });

  it('should log a warning when a invalid component name is passed in props', () => {
    mount(
      <VariateProvider 
      config={{ testing: 'testing' }} 
      debug={true} 
      tracking={true}
      >
        // @ts-ignore: An argument for 'useVariate' was not provided
        <VariateComponent componentName={1} defaultContent={{ title: 'testing' }}>
          { mockRenderProps }
        </VariateComponent>
      </VariateProvider>
    );
    expect(mockConsoleWarn.mock.calls[0][0]).toBe(INVALID_COMPONENT_NAME)
  });
  
  it('should return a render prop with the right content when there are no experiments running on the component', () => {
    mount(
      <VariateProvider 
        config={{ testing: 'testing' }} 
        debug={true} 
        tracking={true}
      >
        <VariateComponent componentName="testingComponent" defaultContent={{ title: 'testing' }}>
          { mockRenderProps }
        </VariateComponent>
      </VariateProvider>
    );
    expect(mockRenderProps.mock.calls[0][0]).toMatchObject({
      componentName: 'testingComponent',
      variables: { title: 'testing' }
    });
  });

  it('should return the experiment content when there is an experiment running', () => {
    Variate.prototype.components = {
      testingComponent: {
        variables: {
          title: 'experiment testing',
          description: 'experiment testing'
        }
      }
    };
    mount(
      <VariateProvider 
        config={{ testing: 'testing' }} 
        debug={false} 
        tracking={true}
      >
        <VariateComponent 
          componentName="testingComponent" 
          defaultContent={{ title: 'testing', somethingElse: 'testing' }}
        >
          { mockRenderProps }
        </VariateComponent>
      </VariateProvider>
    );
    expect(mockRenderProps.mock.calls[0][0]).toMatchObject({
      componentName: 'testingComponent',
      variables: { 
        title: 'experiment testing',
        description: 'experiment testing',
        somethingElse: 'testing'
      }
    });
  });

});