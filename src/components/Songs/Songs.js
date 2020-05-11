import React, { Component } from "react";
import { Box, TextInput } from "grommet";
export default class Songs extends Component {
  render() {
    return (
      <div>
        <Box fill align="center" justify="center" pad="large">
          <Box width="large">
            <TextInput placeholder="Search songs" />
          </Box>
        </Box>
      </div>
    );
  }
}
