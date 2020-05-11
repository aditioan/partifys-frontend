import React, { Component } from "react";
import { Attraction, Car } from "grommet-icons";

import { TextInput, Anchor, Box, Button, Text } from "grommet";
import qs from "querystring";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partyName: "",
      partyCode: "",
      isLoading: false,
      isLoaggedIn: false,
      guestName :""
    };
    this.spotifyLogin = this.spotifyLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGuest = this.handleGuest.bind(this);
  }

  componentDidMount() {
    const newUrl = new URLSearchParams(window.location.search);
    console.log(newUrl);
    if (newUrl.has("code")) {
      const code = newUrl.get("code");
      const state = newUrl.get("state");

      const token = {
        code: code,
        state: state,
      };
      console.log(token);
      this.postToken(token);
      window.location = "/room";
    }
  }
  setLoading(val) {
    this.props.loading(val);
  }

  join() {
    const roomnumber = {
      roomNumber: this.state.partyCode,
      guestName : this.state.guestName
    };

    fetch("http://localhost:3001/room/join", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roomnumber),
    })
      .then((res) => res.json())
      .then((data) => {
        // this.setState({
        //   partyName: data.owner + "'s Party",
        //   partyCode: data.roomNumber,
        // });
        console.log(data)
       
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }


  makeDummyReq() {
    fetch("http://localhost:3001/")
      .then((res) => res.text())
      .then((result) => {
        console.log(result);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }

  handleChange(e) {
    this.setState({ partyCode: e.target.value });
  }
  handleGuest(e) {
    this.setState({ guestName: e.target.value });
  }


  postToken(token) {
    fetch("http://localhost:3001/room/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setLoggedInFlag(true, false, data.roomNumber);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  spotifyLogin() {
    window.location = this.spotifyOauthUrl;
  }

  get spotifyOauthUrl() {
    const query = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      response_type: "code",
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      state: qs.stringify({
        party: this.state.partyName,
        code: this.state.partyCode,
      }),
      scope: "streaming user-read-email user-read-private",
    };

    return `https://accounts.spotify.com/authorize?${qs.stringify(query)}`;
  }

  

  render() {
    return (
      <div>
        <Box
          direction="row-responsive"
          justify="center"
          align="center"
          pad="xlarge"
          background="28302a"
          gap="medium"
        >
          <Box
            pad="large"
            align="center"
            background={{ color: "light-2", opacity: "strong" }}
            round
            width="medium"
            height="medium"
            justify="center"
            gap="small"
          >
            <Attraction size="large" />
            <Text>Join a Party</Text>
            
            <TextInput placeholder="Room number" value={this.state.partyCode} onChange={this.handleChange}/>
            <TextInput placeholder="Your name" value={this.state.guestName} onChange={this.handleGuest}/>
            <Button label="Join" onClick={() => {
                this.join();
              }} />
          </Box>
          <Box
            pad="large"
            align="center"
            background="dark-3"
            width="medium"
            height="medium"
            justify="center"
            round
            gap="small"
          >
            <Car size="large" color="light-2" />
            <Text>Create a party</Text>

            <Button
              label="Spotify Login"
              onClick={() => {
                this.spotifyLogin();
              }}
            ></Button>
          </Box>
        </Box>
      </div>
    );
  }
}
