import React, { Component } from "react";
import { formatName } from "./layout-components/format-name";
import styles from "./app.module.css";
import LandingPage from "./components/LandingPage.js/LandingPage";
import Home from "./components/Home";
import Loading from "./components/Loading";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partyName: "",
      partyCode: "",
      isLoading: false,
      isLoaggedIn: false,
    };
    this.setLoggedInFlag = this.setLoggedInFlag.bind(this);
    this.setLoadingflag = this.setLoadingflag.bind(this);
  }
  // state = {
  //   partyName: '',
  //   partyCode: '',
  //   loginflag:false
  // }

  setLoadingflag(val) {

    this.setState({
      isLoading: val,
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
      <div className={styles.app}>
        {this.state.isLoading && !this.state.isLoaggedIn ? (
          <Loading />
        ) : this.state.isLoaggedIn && !this.state.isLoading ? (
          <Home room={this.state.partyCode} />
        ) : (
          <LandingPage
            loading={this.setLoadingflag}
            loggedIn={this.setLoggedInFlag}
          />
        )}
      </div>
    );
  }
}
