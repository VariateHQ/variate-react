import React from 'react';
import styled from 'styled-components';

import { useVariate } from '@variate/react';

const Container = styled.section`
  background: url(${props => props.backgroundImage}) no-repeat;
  background-size: contain;
  height: 400px;
  background-size: cover;
`;

const Title = styled.h1`
  position: absolute;
  top: 100px;
  left: 100px;
  font-size: 40px;
  color: #fff; 
`;

const Link = styled.a`
  position: absolute;
  top: 200px;
  left: 100px;
  display: block;
  width: 50px;
  margin: 20px 0;
  padding: 20px;
  background: #aec6cf;
`;

const Hero = ({
  defaultContent
}) => {

  const { variables, variate } = useVariate('HomeHero', defaultContent);

  return (
    <Container backgroundImage={variables.backgroundImage}>
      <Title>{variables.headline}</Title>
      <Link onClick={e => {
        e.preventDefault();
        variate.track('Conversion');
      }}>Convert</Link>
    </Container>
  )
}

Hero.defaultProps = {
  defaultContent: {
    headline: "No Experiment Is Running",
    backgroundImage: 'https://www.filmindependent.org/wp-content/uploads/2016/02/hero-placeholder-768x293.png'
  }
}

export default Hero;