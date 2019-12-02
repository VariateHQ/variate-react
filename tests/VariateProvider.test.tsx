import React from 'react';
import { mount } from 'enzyme';

jest.spyOn(global.console, 'warn');

// Mock the variate engine
jest.mock('@variate/engine');

import { VariateProvider, VariateComponent, useVariate } from '../src/index';
import Variate from '@variate/engine';

describe('VariateProvider', () => {

  let mockRenderProps: any;
  let mockVariateInitialize: any;
  let mockConsoleWarn: any;
  let mockConsoleDebug: any;

  beforeEach(() => {
    Variate.mockClear();
    mockRenderProps = jest.fn();
    mockVariateInitialize = Variate.prototype.initialize = jest.fn();
    mockConsoleWarn = jest.spyOn(global.console, 'warn');
    mockConsoleDebug = jest.spyOn(global.console, 'debug');
  });

  afterEach(() => {
    mockRenderProps.mockClear();
    mockVariateInitialize.mockClear();
    mockConsoleWarn.mockClear();
    mockConsoleDebug.mockClear();
  });

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