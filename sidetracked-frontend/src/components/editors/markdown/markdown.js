import * as React from "react";
import { useRef, useEffect } from "react"
import {
    Flex,
    Text,
    Button
} from 'rebass'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Comms from "../../../utils/communication"

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-chrome";
  

class Markdown extends React.Component {
    constructor(props) {
        super(props)
        console.log("MARKDOWN STARTING")
        this.timerID = 0 ;
        this.state = {
            code: "# UNABLE TO LOAD RIP",
            file_name: props.location.file_name
        }
        
    }

    componentDidMount() {
        console.log("componentWillMount")
        this.downloadfile()
        this.startTicks()
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    startTicks() {
        this.timerID = setInterval(() => this.downloadfile(), 1000);
    }

    downloadfile() {
        Comms.getFile(this.state.file_name, (body) => {
            var res_json = JSON.parse(body);
            let decoded_file = atob(res_json.data)
            console.log(decoded_file)
            if(decoded_file != this.state.code) {
                this.setState({ 
                    code: decoded_file
                })
            }
        })
    }

    // https://github.com/securingsincity/react-ace/blob/90255338bdb4312db6a2caf81decfb153b401a1e/docs/Ace.md
    render() {
        return (
            <div style={{  height: "100vh", width: "100vw", backgroundColor:"#1e2227" }}>
                <Navbar bg="primary" variant="dark" style={{  height: "5vh" }}>
                    <Navbar.Brand onClick={() => this.props.history.push({pathname: "/"})}>TEAM0001</Navbar.Brand>
                        <Nav className="mr-auto" />
                </Navbar>
                {/* <SideTracksCodeMirror name="formula" onChange={this.updateCode} value={this.state.code} /> */}
                <AceEditor
                    placeholder="Start Editing"
                    mode="markdown"
                    theme="chrome"
                    name="blah2"
                    height="95vh"
                    width="100%"
                    // onLoad={this.onLoad}
                    onChange={(newCode) => {
                        let obj_to_send = { "file": this.state.file_name, "data": btoa(newCode) }
                        Comms.sendFile(obj_to_send);
                    }}
                    fontSize={20}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={this.state.code}
                    wrapEnabled={true}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 4,
                    }}
                />
            </div>

        )
    }
}

export default Markdown;