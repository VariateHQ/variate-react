import React from 'react';
import { mount } from 'enzyme';

import { VariateProvider } from './index';
import Variate from '@variate/engine';

describe('VariateProvider', () => {

  beforeEach(() => {
    Variate.mockClear();
  })

  it('should render it\'s children when it\'s children are JSX elements', () => {
    const mounted = mount(
      <VariateProvider config={{}} debug={false}>
        <p>Testing</p>
      </VariateProvider>
    );
    expect(mounted.contains('Testing')).toBe(true);
  });

  it('should render a renderProp with variate when it\'s children are a function', () => {
    const mounted = mount(
      <VariateProvider config={{}} debug={false}>
        (() => <p>Testing</p>)
      </VariateProvider>
    );
    expect(mounted.contains('Testing')).toBe(true);
  });

  it('should setup variate with the right variables', () => {
    mount(
      <VariateProvider config={{ testing: 'testing' }} debug={true} tracking={true}>
        (() => <p>Testing</p>)
      </VariateProvider>
    );
    const args = Variate.mock.calls[0][0];
    expect(Variate).toHaveBeenCalledTimes(1);
    expect(args.config.testing).toBe('testing');
    expect(args.tracking).toBe(true);
    expect(args.debug).toBe(true);
  });

  it('should console.log an error when either config is missing', () => {

  });

});