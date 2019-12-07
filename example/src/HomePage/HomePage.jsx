import React from 'react'

import Hero from './Hero';

import { useVariate } from '@variate/react';

const HomePage = () => {

  const { variables } = useVariate('HomePage');  

  return (
    <section>
      <Hero />
      <h1>{ variables.title }</h1>
      {/* <VariateComponent componentName="HomePage">
        {({ content }) => (
          <h1>content.title</h1>
        )}
      </VariateComponent> */}
    </section>
  );

}

export default HomePage;
