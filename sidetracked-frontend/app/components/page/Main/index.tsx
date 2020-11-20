import React from 'react';
import {
    Flex,
} from 'rebass'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import './index.css';

export default function({ children }) {
  return (
    <div className="container">
      <Navbar className="navbar" bg="primary" variant="dark">
        <Navbar.Brand onClick={() => this.props.history.push({pathname: "/"})}>TEAM0001</Navbar.Brand>
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

          {children}

        </Flex>
    </div> 
  );
}
