import React, { Component } from "react";
import { formatName } from "./layout-components/format-name";
import { Redirect } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

import Loading from "./components/Loading";
import "react-awesome-button/dist/styles.css";
import { Switch, Route, Link } from "react-router-dom";
import Room from "./components/Room";
import { Text, Box, Grommet, Header } from "grommet";
import Login from "./components/Login/Login";
import { AwesomeButton } from "react-awesome-button";
const theme = {
  global: {
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partyName: "",
      partyCode: "",
      isLoading: false,
      isLoggedIn: false,
    };
    this.setLoggedInFlag = this.setLoggedInFlag.bind(this);
    this.setLoadingflag = this.setLoadingflag.bind(this);
    this.setPartyDetails = this.setPartyDetails.bind(this);
  }
  // state = {
  //   partyName: '',
  //   partyCode: '',
  //   loginflag:false
  // }
  componentDidMount() {
    const newUrl = new URLSearchParams(window.location.search);
    if (newUrl.has("code")) {
      const code = newUrl.get("code");
      const state = newUrl.get("state");

      const token = {
        code: code,
        state: state,
      };

      fetch("http://localhost:3001/room/", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.setState({ partyCode: data.roomNumber });
          this.setState({ isLoggedIn: true });
          // window.location = '/room'
          //this.props.history.push("/room");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  componentDidUpdate() {}
  async postToken(token) {
    fetch("http://localhost:3001/room/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  setLoadingflag(val) {
    this.setState({
      isLoading: val,
    });
  }
  setPartyDetails(val) {
    this.setState({
      partyCode: val.partyCode,
      partyName: val.partyName,
    });
  }

  setLoggedInFlag(val1, val2, room) {
    this.setState({
      isLoaggedIn: val1,
      isLoading: val2,
      partyCode: room,
    });
  }

  get partyUrl() {
    return `/${this.state.partyName}/${this.state.partyCode}`;
  }

  onPartyNameChange = (partyName) =>
    this.setState({ partyName: formatName(partyName) });

  render() {
    return (
      // <div className={styles.app}>
      //   {this.state.isLoading && !this.state.isLoaggedIn ? (
      //     <Loading />
      //   ) : this.state.isLoaggedIn && !this.state.isLoading ? (
      //     <Home room={this.state.partyCode} />
      //   ) : this.state.partyCode !== "" ? (
      //     <JoinRoom room={roomDetails} />
      //   ) : (
      //     <LandingPage
      //       loading={this.setLoadingflag}
      //       loggedIn={this.setLoggedInFlag}
      //       partyDetails={this.setPartyDetails}
      //     />
      //   )}
      // </div>

      <Grommet theme={theme}>
        <Header background="#28302a" pad="small">
          <Text size={"xxlarge"}>Partifys</Text>
          <Box direction="row" gap="medium">
            {!this.state.isLoggedIn && (
              <Link to="/login">
                <AwesomeButton type="primary">Create a party</AwesomeButton>
              </Link>
            )}
            <Link to="/profile">
              <AwesomeButton type="secondary">Profile</AwesomeButton>
            </Link>
          </Box>
        </Header>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/room">
            <Room room={this.state.partyCode} />
          </Route>

          <Route exact path="/">
            <LandingPage
              loading={this.setLoadingflag}
              loggedIn={this.setLoggedInFlag}
              partyDetails={this.setPartyDetails}
            />
          </Route>

          <Route path="*">
            {this.state.isLoggedIn ? <Redirect to="/room" /> : <Loading />}
          </Route>
        </Switch>
      </Grommet>
    );
  }
}
