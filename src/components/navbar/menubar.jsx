import React from 'react';
import {Navbar, Nav, Button, Form} from 'react-bootstrap';
import { Link, Route} from 'react-router-dom';
import { SiBuymeacoffee } from 'react-icons/si';
import SearchBarFilter from '../search-bar-filter/search-bar-filter';

import './menubar.scss';

export function Menubar ({user, searchBarFilter}) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }


  const isAuth = () => {
    if(typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  

  return(
    <Navbar className="main-nav"  sticky="top" expand="lg" variant="dark">
      <Link to={`/`}>
      <Navbar.Brand className="navbar-logo"><SiBuymeacoffee size="1.5em" /></Navbar.Brand>
      </Link>
          {isAuth() && (
          <Route exact path="/" render={() => <Form className="search-input"><SearchBarFilter searchBarFilter={searchBarFilter} /></Form>}/>
          )}

          <Navbar.Toggle aria-controls="responsive-navbar-nav" className='nav-toggle-icon' />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="nav-list ml-auto">

              {isAuth() && (
              <Link to={`/`}>
              <Button style={{color:"white"}} className="nav-item" variant="link">Cafes</Button> 
              </Link>
              )}
              {isAuth() && (
              <Link to={`/areas`}>
              <Button style={{color:"white"}} className="nav-item" variant="link">Areas</Button> 
              </Link>
              )}
              {isAuth() && (
              <Link to={`/users/${user._id}`}>
              <Button style={{color:"white"}} className="nav-item" variant="link">Account</Button> 
              </Link>
              )}
              {isAuth() && (
              <Link>
              <Button style={{color:"white"}} className="nav-item" variant="link" onClick={() => { onLoggedOut() }}>Logout</Button>
              </Link>
              )}
              {!isAuth() && (
              <Link to={`/`}>
              <Button style={{color:"white"}} className="nav-item" variant="link">Login</Button> 
              </Link>
              )}
               {!isAuth() && (
              <Link to={`/register`}>
              <Button style={{color:"white"}} className="nav-item" variant="link">Register</Button> 
              </Link>
              )}
            </Nav>
          </Navbar.Collapse> 
    </Navbar>
  );
}


