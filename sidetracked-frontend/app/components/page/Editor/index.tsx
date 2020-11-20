import * as React from "react";
import { useRef, useEffect } from "react"
import {
    Flex,
    Text,
    Button
} from 'rebass'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import CodeMirror from "react-codemirror";
import API from "../../../utils"

import 'codemirror/mode/jsx/jsx'
import 'codemirror/lib/codemirror.css'

import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/lint'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/theme/seti.css'
import 'codemirror/theme/darcula.css'
import 'codemirror/addon/display/fullscreen.css'
import './index.css'


function SideTracksCodeMirror({ value, onChange }) {
  const codemirrorRef = useRef();

  useEffect(() => {
    codemirrorRef.current.getCodeMirror().setValue(value);
    codemirrorRef.current.getCodeMirror().setSize("100vw", "95vh")
  }, []);

  return (
    <div>
      <CodeMirror
        ref={codemirrorRef}
        value={value}
        onChange={onChange}
        name={"WHAT IS THIS"}
        options={{
          lineNumbers: true,
          readOnly: false,
          mode: 'markdown',
          theme: 'darcula',
          lineWrapping: true,
          smartIndent: true,
          matchBrackets: true,
          scrollbarStyle: null,
          showCursorWhenSelecting: true,
        }}
      />
    </div>
  );
}

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: "# UNABLE TO LOAD RIP",
      file_name: props.location.file_name
    }
    console.log("MARKDOWN STARTING")
    this.downloadfile()
  }

  downloadfile() {
    API.getFile(this.state.file_name, (body) => {
      var res_json = JSON.parse(body);
      console.log(res_json);
      // this.setState({ 
      //     curr_file_list: res_json["files"],
      //     curr_dir_name: dir_name
      // })
    })
  }

  updateCode(newCode) {
    console.log("GOT HERE")
    console.log(newCode)
  }

  render() {
    return (
      <div className="container">
        <Navbar bg="primary" variant="dark" style={{  height: "5vh" }}>
          <Navbar.Brand onClick={() => this.props.history.push({pathname: "/"})}>TEAM0001</Navbar.Brand>
          <Nav className="mr-auto" />
        </Navbar>

        <SideTracksCodeMirror name="formula" onChange={this.updateCode} value={this.state.code} />
      </div>

    )
  }
}
