
import React, { Component } from 'react';
import {
    Box,
    Flex,
    Text,
    Link,
    Button
} from 'rebass'
// import { Grid, Image, Button } from 'semantic-ui-react'
// import { display } from 'styled-system';
import './homePage.css'
import ButtonBoot from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

class HomePage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log("HERE")
        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">TEAM0001</Navbar.Brand>
                    <Nav className="mr-auto">
                    {/* <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                    {/* <Form inline> */}
                    {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                    {/* <ButtonBoot variant="outline-info">Search</ButtonBoot> */}
                    {/* </Form> */}
                </Navbar>
                <Flex flexWrap='wrap' px={"8vw"} pt={"8vh"}>
                    <Button width={"200px"} height={"200px"} mx={"20px"} my={"10px"} backgroundColor="#007bff">
                        <Text
                            fontSize={ "40px" }
                            fontWeight='bold'
                            color='white'>
                            Notes
                        </Text>
                    </Button>
                    <Button width={"200px"} height={"200px"} mx={"20px"} my={"10px"} backgroundColor="#007bff">
                        plugin 2
                    </Button>
                    <Button width={"200px"} height={"200px"} mx={"20px"} my={"10px"} backgroundColor="#007bff">
                        plugin 3
                    </Button>
                    <Button width={"200px"} height={"200px"} mx={"20px"} my={"10px"} backgroundColor="#007bff">
                        plugin 4
                    </Button>
                    <Button width={"200px"} height={"200px"} mx={"20px"} my={"10px"} backgroundColor="#007bff">
                        plugin 5
                    </Button>
                    <Button width={"200px"} height={"200px"} mx={"20px"} my={"10px"} backgroundColor="#007bff">
                        plugin 6
                    </Button>
                    <Button width={"200px"} height={"200px"} mx={"20px"} my={"10px"} backgroundColor="#007bff">
                        plugin 7
                    </Button>
                    <Button width={"200px"} height={"200px"} mx={"20px"} my={"10px"} backgroundColor="#007bff">
                        plugin 8
                    </Button>
                </Flex>
            </div> 
        );
    }
}

export default HomePage;