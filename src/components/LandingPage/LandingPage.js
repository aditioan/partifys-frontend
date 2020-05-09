import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import qs from "querystring";
import logo from "../../music.svg";
import styles from "./landing.module.css";
import { Input } from "antd";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partyName: "",
      partyCode: "",
      isLoading: false,
      isLoaggedIn: false,
    };
    this.join = this.join.bind(this);
  }
  componentDidMount() {
    const newUrl = new URLSearchParams(window.location.search);

    if (newUrl.has("code")) {
      const code = newUrl.get("code");
      const state = newUrl.get("state");
      this.setLoading(true);

      const token = {
        code: code,
        state: state,
      };
      this.postToken(token);
    }
  }
  setLoading(val) {
    this.props.loading(val);
  }

  join() {
    const roomnumber = {
      roomNumber: this.state.partyCode,
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
        this.setState({
          partyName: data.owner + "'s Party",
          partyCode: data.roomNumber,
        });
        this.setPartyDetails({partyName : this.state.partyName, partyCode:this.state.partyCode});
      
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  setLoggedInFlag(val1, val2, roomNumber) {
    this.props.loggedIn(val1, val2, roomNumber);
  }

  setPartyDetails(val){
    this.props.partyDetails(val);
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
      <div className={styles.main}>
        <div className={`${styles.child} ${styles.item1}`}>
          <div>
            <h1 className={styles.header}>Welcome to partifys</h1>
            <p className={styles.subtitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br></br> Pellentesque eu velit molestie, maximus magna ut,
            </p>
          </div>
          <div className={styles.input}>
            <Input
              size="large"
              onChange={(e) => this.handleChange(e)}
              className={styles.partyText}
              placeholder="Party code"
            />
            <AwesomeButton
              className={styles.btn}
              type="secondary"
              onPress={this.join}
            >
              Join a party
            </AwesomeButton>

            <AwesomeButton
              className={styles.btn}
              type="primary"
              href={this.spotifyOauthUrl}
            >
              Create a party
            </AwesomeButton>
          </div>
        </div>
        <div className={`${styles.child}${styles.item2}`}>
          <img className={styles.image} src={logo} alt="logo" />
        </div>
      </div>
    );
  }
}

export default LandingPage;
