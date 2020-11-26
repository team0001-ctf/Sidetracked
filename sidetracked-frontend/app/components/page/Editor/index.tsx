import * as React from "react";
import { useRef, useEffect } from "react"
import {
    Flex,
    Text,
    Button
} from 'rebass'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import API from "../../../utils"

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/theme-chrome";
import './index.css'



export default class extends React.Component {
    constructor(props) {
        super(props)
        console.log("EDITOR STARTING")
        this.timerID = 0;
      this.editorRef = React.createRef();
        // this.cursorPosition = null;
        this.state = {
            code: "# UNABLE TO LOAD RIP",
            file_name: props.location.file_name,
            file_type: this.getType(props && props.location && props.location.file_name && props.location.file_name.substr(props.location.file_name.lastIndexOf("."))),
            exe_out: ""
        }
    }

    getType(_type) {
      console.log(_type)
      switch(_type) {
        case ".py":
          return "python"
          break;
        case ".md":
          return "markdown"
          break;
        default:
          return "text"
      }
    }

    componentDidMount() {
        console.log("componentWillMount")
        this.downloadfile()
        // this.startTicks()
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    startTicks() {
        this.timerID = setInterval(() => this.downloadfile(), 1000);
    }

    downloadfile() {
        API.getFile(this.state.file_name, (body) => {
          // console.log(body);
            try {
              var res_json = JSON.parse(body);
              // console.log(res_json, typeof res_json);

              let decoded_file = atob(res_json.data)
              // console.log(decoded_file)
              if(decoded_file != this.state.code) {
                  this.setState({
                      code: decoded_file
                  })
              }
            }
            catch (error) {}
        })
    }

    runFile() {
        API.exeFile("python", this.state.file_name, (body) => {
            var res_json = JSON.parse(JSON.stringify(body));
            // let decoded_file = atob(res_json.data)
            console.log(res_json)
            if(res_json["out"] != this.state.exe_out) {
                this.setState({ 
                    exe_out: res_json["out"]
                })
            }
        })
    }

    renderExeOut() {
        if(this.state.exe_out != "") {
            return (
                <AceEditor
                    placeholder="Start Editing"
                    mode="text"
                    theme="chrome"
                    name="blah2"
                    height="20vh"
                    width="100%"
                    fontSize={20}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={this.state.exe_out}
                    wrapEnabled={true}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 4,
                    }}
                />
            )
        } else {
            return
        }
    }

    // https://github.com/securingsincity/react-ace/blob/90255338bdb4312db6a2caf81decfb153b401a1e/docs/Ace.md
    render() {
        var first_ace_size = this.state.exe_out != "" ? "75vh" : "95vh"
        return (
            <div className="container">
              <Navbar bg="primary" variant="dark" style={{  height: "5vh" }}>
                <Navbar.Brand onClick={() => this.props.history.push({pathname: "/"})}>TEAM0001</Navbar.Brand>
                <Nav className="mr-auto" />
                <Nav.Link onClick={() => this.runFile()}>Run</Nav.Link>
              </Navbar>

              <AceEditor
                  ref={this.editorRef}
                  placeholder="Start Editing"
                  mode={this.state.file_type}
                  theme="chrome"
                  name="blah2"
                  height={first_ace_size}
                  width="100%"
                  // onLoad={this.onLoad}
                  // onCursorChange={(selection) => {
                  //   this.cursorPosition = selection.getCursor();
                  // }}
                  onChange={(value, evt) => {
                    // console.log(this.editorRef);
                    // console.log(this.cursorPosition);
                    console.log(value, evt);
                      let obj_to_send = { "file": this.state.file_name, "data": btoa(value) }
                      API.sendFile(obj_to_send);
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
              {this.renderExeOut()}
            </div>
        )
    }
}
