import React, { Component } from "react";
import SideNav from "../SideNav/SideNav";
import { Box, Grid } from "grommet";
import { Switch, Route } from "react-router-dom";
import Songs from "../Songs/Songs";
export default class Room extends Component {
  render() {
    console.log(this.props.room);
    return (
      <div>
        <Grid
          rows={["xxsmall", "medium", "xsmall"]}
          columns={["1/4", "3/4"]}
          areas={[["sidebar", "main"]]}
          gap="small"
        >
          <Box gridArea="sidebar">
            <SideNav />
          </Box>

          <Box gridArea="main">
            <Switch>
              <Route path="/room/songs">
                <Songs />
              </Route>
            </Switch>
          </Box>
        </Grid>
      </div>
    );
  }
}
