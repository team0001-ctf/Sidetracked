
import React, { Component } from 'react';
import {
    Flex,
    Text,
    Button
} from 'rebass'
import './notes.css'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Comms from "../../utils/communication"

class NotesPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            curr_file_list: "",
            curr_dir_name: props.location.curr_dir
        }
        this.fetch_file_list(this.state.curr_dir_name)
    }

    // Get all the files we need here
    fetch_file_list(dir_name) {
        var file_list = Comms.listFiles(dir_name, (body) => {
            var res_json = JSON.parse(body);
            console.log(res_json)
            this.setState({ 
                curr_file_list: res_json["files"],
                curr_dir_name: dir_name
            })
        })
    }

    draw_buttons() {
        var ret = []
        for(var i = 0; i < this.state.curr_file_list.length; i++) {
            if(this.state.curr_file_list[i].type == "folder"){
                let file_name_folder = this.state.curr_file_list[i].file
                ret.push(
                    <Button width={"200px"} height={"200px"} mx={"20px"} my={"10px"} onClick={() => this.fetch_file_list(this.state.curr_dir_name + file_name_folder + "/")} backgroundColor="#8d1417">
                        <Text
                            fontSize={ "40px" }
                            fontWeight='bold'
                            color='white'>
                            {this.state.curr_file_list[i].file}
                        </Text>
                    </Button>
                )
            } else {
                let file_name_file = this.state.curr_file_list[i].file
                ret.push(
                    <Button width={"200px"} height={"200px"} mx={"20px"} my={"10px"} onClick={() => this.props.history.push({pathname: "/editors/markdown", file_name: this.state.curr_dir_name + file_name_file})} backgroundColor="#007bff">
                        <Text
                            fontSize={ "40px" }
                            fontWeight='bold'
                            color='white'>
                            {this.state.curr_file_list[i].file}
                        </Text>
                    </Button>
                )
            }
        }
        console.log(ret)
        return ret
    }

    handle_back_clicked() {
        if(this.state.curr_dir_name == "/") {
            this.props.history.goBack()
        } else {
            var new_curr_dir = this.state.curr_dir_name.substr(0, this.state.curr_dir_name.lastIndexOf("/", this.state.curr_dir_name.length - 2));
            this.fetch_file_list(new_curr_dir + "/")
        }
    }

    render() {
        return (
            <div style={{  height: "100vh", width: "100%", backgroundColor:"#2C2F33"}}>
                <Navbar bg="primary" variant="dark" style={{  height: "5vh" }}>
                    <Navbar.Brand onClick={() => this.props.history.push({pathname: "/"})}>TEAM0001</Navbar.Brand>
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
                    <Button width={"200px"} height={"200px"} mx={"20px"} my={"10px"} onClick={() => this.handle_back_clicked()} backgroundColor="#007bff">
                            <Text
                                fontSize={ "40px" }
                                fontWeight='bold'
                                color='white'>
                                ..
                            </Text>
                    </Button>
                    {this.draw_buttons()}
                </Flex>
            </div>
        );
    }
}

export default NotesPage;