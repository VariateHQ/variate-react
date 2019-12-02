import React from 'react';
import { mount } from 'enzyme';

jest.spyOn(global.console, 'warn');

// Mock the variate engine
jest.mock('@variate/engine');

import { INVALID_COMPONENT_NAME } from './../src/lang/warn';
import { VariateProvider, useVariate } from '../src/index';
import Variate from '@variate/engine';

const TestSetup = (TestingComponent: Function) => (
  <VariateProvider 
    config={{ testing: 'testing' }} 
    debug={true} 
    tracking={true}
  >
    <TestingComponent />
  </VariateProvider>
);

describe('useVariate', () => {

  let mockConsoleWarn: any; 

  beforeEach(() => {
    Variate.mockClear();
    Variate.prototype.initialize = jest.fn();
    mockConsoleWarn = jest.spyOn(global.console, 'warn');
  });

  it('should fail and log out an error if no componentName is passed', () => {

    const mockTestingChildren = jest.fn();

    const TestingComponent = () : void => {
      // @ts-ignore: An argument for 'useVariate' was not provided
      const { content, variate } = useVariate();
      mockTestingChildren({ content, variate });
      return null;
    }

    mount(TestSetup(TestingComponent));

    expect(mockConsoleWarn.mock.calls[0][0]).toBe(INVALID_COMPONENT_NAME);

  });

  it('should pass the right content to the jsx elements when there is no experiment running', () => {

    const mockTestingChildren = jest.fn();

    const TestingComponent = () : void => {
      const { content, variate } = useVariate('TestingComponent', {
        testing: 'testing'
      });
      mockTestingChildren({ content, variate });
      return null;
    }

    mount(TestSetup(TestingComponent));

    expect(mockTestingChildren.mock.calls[0][0]).toMatchObject({
      content: {
        testing: 'testing'
      }
    });
  
  });

  it('should pass the right content to the jsx elements when there is an experiment running', () => {

    const mockTestingChildren = jest.fn();

    Variate.prototype.components = {
      TestingComponent: {
        attributes: {
          title: 'experiment testing',
          description: 'experiment testing'
        }
      }
    };

    const TestingComponent = () : void => {
      const { content, variate } = useVariate('TestingComponent', {
        testing: 'testing',
        somethingElse: 'testing'
      });
      mockTestingChildren({ content, variate });
      return null;
    };

    mount(TestSetup(TestingComponent));

    expect(mockTestingChildren.mock.calls[0][0]).toMatchObject({
      content: {
        title: 'experiment testing',
        description: 'experiment testing',
        somethingElse: 'testing'
      }
    });

  });

});

