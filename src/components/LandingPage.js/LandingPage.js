import React, { Component } from "react";
import styles from "../../app.module.css";
import { ExternalLinkButton } from "../../layout-components/button";
import TextField from "../../layout-components/text-field";
import qs from "querystring";
export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partyName: "",
      partyCode: "",
      isLoading: false,
      isLoaggedIn: false,
    };
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

  setLoggedInFlag(val1, val2, roomNumber) {
    this.props.loggedIn(val1, val2, roomNumber);
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
      <div className={styles.home}>
        <h1 className={styles.titleApp}>Partifys</h1>

        <p className={styles.highlight}>
          A premium Spotify account is required to use Partifys
        </p>

        <TextField type="text" name="partycode" placeholder="Party code" />
        <ExternalLinkButton variant="primary" href={`https://www.google.com/`}>
          Join a party
        </ExternalLinkButton>

        <ExternalLinkButton variant="secondary" href={this.spotifyOauthUrl}>
          Create a party
        </ExternalLinkButton>
      </div>
    );
  }
}
