import React from 'react';
import styled from 'styled-components';

import { VariateComponent } from '../../src';

const HeroContainer = styled.section`
  background: url(${props => props.backgroundImg}) no-repeat;
  height: 400px;
  background-size: cover;
`;

const Hero = ({
  content
}) => (
  <VariateComponent 
    componentName="Hero" 
    viewName="HomePage"
    defaultContent={content}>
    {({ content }) => (
      <HeroContainer backgroundImg={content.backgroundImg}>
        <h1>{content.title}</h1>
      </HeroContainer>
    )}
  </VariateComponent>
);

Hero.defaultProps = {
  content: {
    title: "No Experiment Is Running",
    backgroundImg: 'https://www.filmindependent.org/wp-content/uploads/2016/02/hero-placeholder-768x293.png'
  }
}

export default Hero;