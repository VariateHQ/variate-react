import React from 'react';
import styled from 'styled-components';
import { VariateComponent } from '@variate/react';
import { Link } from 'react-router-dom';

const NavLogo = styled(Link)``;

const NavLinks = styled.div``;

const NavLink = styled(Link)``;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background: ${props => props.backgroundColor};
`;

const Nav = ({ content }) => (
  <VariateComponent componentName="Nav" defaultContent={content}>
    {({ variables }) => (
      <NavContainer {...variables}>
        <NavLogo to="/">{variables.title}</NavLogo>
        <NavLinks>
          <NavLink to="/about">About</NavLink>
        </NavLinks>
      </NavContainer>
    )}
  </VariateComponent>
);

Nav.defaultProps = {
  content: {
    title: 'No Experiment',
    backgroundColor: '#ccc',
  },
};

export default Nav;
