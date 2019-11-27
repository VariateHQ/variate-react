import React, { ReactComponentElement } from 'react';
import { mount } from 'enzyme';

jest.spyOn(global.console, 'warn');

// Mock the variate engine
jest.mock('@variate/engine');

import { VariateProvider, VariateComponent, useVariate } from './index';
import Variate from '@variate/engine';
import { JSXElement } from '@babel/types';

describe('VariateContext', () => {

  let mockRenderProps: any;
  let mockVariateInitialize: any;

  beforeEach(() => {
    Variate.mockClear();
    mockRenderProps = jest.fn();
    mockVariateInitialize = Variate.prototype.initialize = jest.fn();
  });

  afterEach(() => {
    mockRenderProps.mockClear();
    mockVariateInitialize.mockClear();
  });

  describe('VariateProvider', () => {
  
    it('should render it\'s children when it\'s children are JSX elements', () => {
      const mounted = mount(
        <VariateProvider config={{}} debug={false}>
          <p>Testing</p>
        </VariateProvider>
      );
      expect(mounted.contains('Testing')).toBe(true);
    });
  
    it('should render a renderProp with variate when it\'s children are a function', () => {
      const testingComponent = <p>Testing</p>;
      const mounted = mount(
        <VariateProvider config={{}} debug={false}>
          {() => testingComponent}
        </VariateProvider>
      );
      expect(mounted.contains('Testing')).toBe(true)
    });
  
    it('should setup variate with the right variables', () => {
      mount(
        <VariateProvider config={{ testing: 'testing' }} debug={true} tracking={true}>
          {() => <p>Testing</p>}
        </VariateProvider>
      );
      const args = Variate.mock.calls[0][0];
      expect(Variate).toHaveBeenCalledTimes(1);
      expect(args.config.testing).toBe('testing');
      expect(args.tracking).toBe(true);
      expect(args.debug).toBe(true);
    });
  
    it('should reinitialize variate with the right audience when activate is called', () => {
      const testAudience = {
        view: 'TestPage',
        targeting: {
          country: 'Canada',
          state: 'BC',
        }
      };
      mount(
        <VariateProvider 
          config={{ testing: 'testing' }} 
          debug={true} 
          tracking={true}
          onViewChange={(activate: any) => activate(testAudience)}
        >
          { mockRenderProps }
        </VariateProvider>
      );
      expect(Variate).toHaveBeenCalledTimes(1);
      expect(mockVariateInitialize).toBeCalledTimes(1);
      expect(mockVariateInitialize.mock.calls[0][0]).toMatchObject(testAudience);
    });
  
  });
  
  describe('VariateComponent', () => {
  
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
        content: { title: 'testing' }
      });
    });
  
    it('should return the experiment content when there is an experiment running', () => {
      Variate.prototype.components = {
        testingComponent: {
          attributes: {
            title: 'experiment testing',
            description: 'experiment testing'
          }
        }
      };
      mount(
        <VariateProvider 
          config={{ testing: 'testing' }} 
          debug={true} 
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
        content: { 
          title: 'experiment testing',
          description: 'experiment testing',
          somethingElse: 'testing'
        }
      });
    });
  
  });

  describe('useVariate', () => {

    const TestSetup = (TestingComponent: Function) => (
      <VariateProvider 
        config={{ testing: 'testing' }} 
        debug={true} 
        tracking={true}
      >
        <TestingComponent />
      </VariateProvider>
    )

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

});
