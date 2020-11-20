import React from 'react';
import {
    Flex,
} from 'rebass'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { history } from '../store';

export default function(Comp) {
  function goto_page(h) {
    console.log('goto_page', h);
    // console.log(history);
    history.push(h);
  }
  function home(data) {
    console.log('home', data);
    goto_page({ pathname: "/" });
  }

  function note(data) {
    console.log('note', data);
    goto_page({ pathname: "/page/notes" });
  }

  return function(props) {
    return (
      <div className="container">
        <Navbar className="navbar" bg="primary" variant="dark">
          <Navbar.Brand onClick={home}>TEAM0001</Navbar.Brand>
          <Nav className="mr-auto">
            {/*
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            */}
          </Nav>
          {/* <Form inline> */}
          {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
          {/* <ButtonBoot variant="outline-info">Search</ButtonBoot> */}
          {/* </Form> */}
          </Navbar>
          <Flex flexWrap='wrap' px={"8vw"} pt={"8vh"}>

            <Comp {...props} goPage={goto_page} goHome={home} goNote={note} />

          </Flex>
      </div>
    );
  }
}
