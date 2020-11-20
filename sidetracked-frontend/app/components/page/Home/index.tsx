import React, { Component } from 'react';
import {
    Text,
    Button
} from 'rebass'
import './index.css'
// import Main from "../Main"
import Main from '../../../containers/Main';
import Notes from "../Notes"
// import {
//     HashRouter,
//     Route,
//     Link,
// } from "react-router-dom"


export default Main(class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
      // console.log(this);
      return (
        <>
          {[
            'Notes',
            "Terminal",
            "Plugin 3",
            "Plugin 4",
            "Plugin 5",
            "Plugin 6",
            "Plugin 7",
            "Plugin 8",
            "Plugin 9",
          ].map((plugin, idx) => {
            return (
              <Button
                key={idx}
                width={"150px"}
                height={"150px"}
                mx={"30px"}
                my={"15px"}
                backgroundColor="#007bff"
                onClick={() => this.props.goNote({ curr_dir: "/" })}
              >
                  <Text
                      fontSize={"21px"}
                      fontWeight='bold'
                      color='white'
                  >
                    {plugin}
                  </Text>
              </Button>
            );
          })}
        </>
        );
    }
});
