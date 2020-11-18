
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
    }

    // Get all the files we need here
    fetch_file_list(dir_name) {
        // var file_list = Comms.listFiles(dir_name, (body) => {
        //     var res_json = JSON.parse(body); 
        //     this.setState({ curr_file_list: res_json["file"].split(" ") })
        // })
        if(dir_name == "/notes/") {
            var obj = '{ "files": [{ "file": "2.md", "type": "text" }, { "file": "3.md", "type": "text" }] }'
            var res_json = JSON.parse(obj);
            console.log("LOGIGN")
            console.log(res_json)
            // this.setState({ curr_file_list: res_json["files"] })
            this.state.curr_file_list = res_json["files"]
        } else {
            var obj = '{ "files": [{ "file": "1.md", "type": "text" }, { "file": "2.md", "type": "text" }, { "file": "notes", "type": "folder" }] }'
            var res_json = JSON.parse(obj);
            console.log("LOGIGN")
            console.log(res_json)
            // this.setState({ curr_file_list: res_json["files"] })
            this.state.curr_file_list = res_json["files"]
        }
    }

    Draw_buttons() {
        var ret = []
        console.log(this.state.curr_file_list.length)
        for(var i = 0; i < this.state.curr_file_list.length; i++) {
            var file_name = this.state.curr_file_list[i].file
            if(this.state.curr_file_list[i].type == "folder"){
                ret.push(
                    <Button width={"200px"} height={"200px"} mx={"20px"} my={"10px"} onClick={() => this.setState({curr_dir_name: (this.state.curr_dir_name + file_name + "/")})} backgroundColor="#8d1417">
                        <Text
                            fontSize={ "40px" }
                            fontWeight='bold'
                            color='white'>
                            {this.state.curr_file_list[i].file}
                        </Text>
                    </Button>
                )
            } else {
                ret.push(
                    <Button width={"200px"} height={"200px"} mx={"20px"} my={"10px"} backgroundColor="#007bff">
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

    render() {
        this.fetch_file_list(this.state.curr_dir_name)
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
                    <Button width={"200px"} height={"200px"} mx={"20px"} my={"10px"} onClick={() => this.props.history.goBack()} backgroundColor="#007bff">
                            <Text
                                fontSize={ "40px" }
                                fontWeight='bold'
                                color='white'>
                                ..
                            </Text>
                    </Button>
                    {this.Draw_buttons()}
                </Flex>
            </div>
        );
    }
}

export default NotesPage;