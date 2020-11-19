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

import 'codemirror/mode/jsx/jsx'
import 'codemirror/lib/codemirror.css'

import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/lint'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/theme/seti.css'
import 'codemirror/theme/darcula.css'
import 'codemirror/addon/display/fullscreen.css'
import './markdown.css'


function SideTracksCodeMirror({ value, onChange }) {
    const codemirrorRef = useRef();

    useEffect(() => {
        codemirrorRef.current.getCodeMirror().setValue(value);
        codemirrorRef.current.getCodeMirror().setSize("100%", "100%")
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

class Markdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            code: "# This is test code",
            readOnly: false,
            mode: 'markdown'
        }
    }

	updateCode(newCode) {
        console.log("GOT HERE")
        console.log(newCode)
    }

    render() {
        return (
            <div style={{  height: "100vh", width: "100vw", backgroundColor:"#2C2F33" }}>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">TEAM0001</Navbar.Brand>
                        <Nav className="mr-auto" />
                </Navbar>

                
                {/* <div style={{ height: "80%", backgroundColor:"white" }}> */}
                    <SideTracksCodeMirror name="formula" onChange={this.updateCode} value={this.state.code} />
                {/* </div> */}
            </div>

        )
    }
}

export default Markdown;