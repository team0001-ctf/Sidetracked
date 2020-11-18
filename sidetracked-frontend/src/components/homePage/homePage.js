
import React, { Component } from 'react';
import {
    Flex,
    Text,
    Button
} from 'rebass'
import './homePage.css'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Notes from "../Notes/notes"
import {
    HashRouter,
    Route,
    Link,
} from "react-router-dom"



class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div style={{  height: "100vh", width: "100%", backgroundColor:"#2C2F33"}}>
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
                    <Button width={"200px"} height={"200px"} mx={"20px"} my={"10px"} onClick={() => this.props.history.push({pathname: "/notespage", curr_dir: "/"})} backgroundColor="#007bff">
                        <Text
                            fontSize={ "40px" }
                            fontWeight='bold'
                            color='white'>
                            Notes
                        </Text>
                    </Button>
                    {/* <Button width={"200px"} height={"200px"} mx={"20px"} my={"10px"} backgroundColor="#007bff">
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
                    </Button> */}
                </Flex>
            </div> 
        );
    }
}

export default HomePage;