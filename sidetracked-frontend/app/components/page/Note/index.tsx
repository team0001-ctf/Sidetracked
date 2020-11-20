import React, { Component } from 'react';
import {
    Text,
    Button
} from 'rebass'
import './index.css'
// import Main from "../Main"
import Main from '../../../containers/Main';
import API from "../../../utils";

export default Main(class extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            curr_file_list: [],
            curr_dir_name: props.location.curr_dir || "",
        };
    }

    componentDidMount() {
        this.fetch_file_list(this.state.curr_dir_name);
    }

    // Get all the files we need here
    fetch_file_list(dir_name) {
      var file_list = API.listFiles(dir_name, (body) => {
        console.log(body);
        const state = {
          curr_dir_name: dir_name,
        };
        try {
          var res_json = JSON.parse(body);
          console.log(res_json)

          state['curr_file_list'] = res_json["files"];
        }
        catch (error) {}

        this.setState(state);
      })
    }

    handle_back_clicked = () => {
        if(this.state.curr_dir_name == "/") {
            this.props.history.goBack()
        } else {
            var new_curr_dir = this.state.curr_dir_name.substr(0, this.state.curr_dir_name.lastIndexOf("/", this.state.curr_dir_name.length - 2));
          console.log('here', new_curr_dir);
            this.fetch_file_list(new_curr_dir + "/")
        }
    }

    render() {
      return (
        <>
          <Button
            width={"150px"}
            height={"150px"}
            mx={"30px"}
            my={"15px"}
            backgroundColor="#007bff"
            onClick={this.handle_back_clicked}
          >
              <Text
                  fontSize={"21px"}
                  fontWeight='bold'
                  color='white'
              >
                ..
              </Text>
          </Button>
          {this.state.curr_file_list.map((item, key) => {
            let file_name = item.file;
            if (item.type == "folder") {
              return (
                <Button
                  width={"150px"}
                  height={"150px"}
                  mx={"30px"}
                  my={"15px"}
                  backgroundColor="#8d1417"
                  onClick={() => this.fetch_file_list(this.state.curr_dir_name + file_name + "/")}
                >
                    <Text
                        fontSize={"21px"}
                        fontWeight='bold'
                        color='white'
                    >
                      {file_name}
                    </Text>
                </Button>
              );
            }
            return (
              <Button
                width={"150px"}
                height={"150px"}
                mx={"30px"}
                my={"15px"}
                backgroundColor="#007bff"
                onClick={() => this.props.history.push({pathname: "/page/editor", file_name: this.state.curr_dir_name + file_name})}
              >
                  <Text
                      fontSize={"21px"}
                      fontWeight='bold'
                      color='white'
                  >
                    {file_name}
                  </Text>
              </Button>
            );
          })}
        </>
      );
    }
});
