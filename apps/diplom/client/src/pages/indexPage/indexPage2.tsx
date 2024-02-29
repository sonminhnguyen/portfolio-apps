import React, { Fragment } from 'react';
import { Container, Row, Column, Navbar, ResponsiveNav, Nav } from 'rsuite';
import mainLogo from '../../../public/assets/img/main-logo.png';

import { HashLink } from 'react-router-hash-link';
const IndexPage = () => {
  return (
    <Fragment>
      <header>
        <Container>
          <Row>
            <Navbar
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 'auto',
                marginBottom: '21px'
              }}
            >
              <Nav
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 'auto'
                }}
              >
                <Nav.Item>
                  <HashLink to="#about" style={{ color: '#4d4959' }}>
                    ПРО КНИТУ
                  </HashLink>
                </Nav.Item>
                <span style={{ margin: '10px' }}>.</span>
                <Nav.Item>
                  <HashLink to="#work" style={{ color: '#4d4959' }}>
                    ДЕЯТЕЛЬНОСТЬ
                  </HashLink>
                </Nav.Item>
                <span style={{ margin: '10px' }}>.</span>
                <Nav.Item style={{ height: 'auto' }}>
                  <HashLink to="#work" style={{ color: '#4d4959' }}>
                    <img src={mainLogo} />
                  </HashLink>
                </Nav.Item>
                <span style={{ margin: '10px' }}>.</span>
                <Nav.Item>
                  <HashLink to="#contact" style={{ color: '#4d4959' }}>
                    КОНТАКТ
                  </HashLink>{' '}
                </Nav.Item>
                <span style={{ margin: '10px' }}>.</span>
                <Nav.Item>
                  <HashLink to="sign-in" style={{ color: '#4d4959' }}>
                    ВХОД
                  </HashLink>
                </Nav.Item>
              </Nav>
            </Navbar>
          </Row>
        </Container>
        <div className="hero"></div>
      </header>
    </Fragment>
  );
};

export default IndexPage;
