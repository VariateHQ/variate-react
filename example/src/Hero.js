import React from 'react';
import styled from 'styled-components';

import { VariateComponent } from '../../src';

const HeroContainer = styled.section`
  background: url(${props => props.backgroundImage}) no-repeat;
  backgroundSize: contain;
  height: 400px;
  background-size: cover;
`;

const Hero = ({
  content
}) => (
  <VariateComponent 
    componentName="Hero"
    defaultContent={content}>
    {({ content }) => (
      <HeroContainer backgroundImage={content.backgroundImage}>
        <h1>{content.title}</h1>
      </HeroContainer>
    )}
  </VariateComponent>
);

Hero.defaultProps = {
  content: {
    title: "No Experiment Is Running",
    backgroundImage: 'https://www.filmindependent.org/wp-content/uploads/2016/02/hero-placeholder-768x293.png'
  }
}

export default Hero;