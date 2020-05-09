import React, { Component } from "react";
import { formatName } from "./layout-components/format-name";
import styles from "./app.module.css";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home";
import Loading from "./components/Loading";
import JoinRoom from "./components/JoinRoom";

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
    this.setPartyDetails = this.setPartyDetails.bind(this);
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
    const roomDetails ={
      partyCode : this.state.partyCode,
      partyName : this.state.partyName
    }
    return (
      <div className={styles.app}>
        {this.state.isLoading && !this.state.isLoaggedIn ? (
          <Loading />
        ) : this.state.isLoaggedIn && !this.state.isLoading ? (
          <Home room={this.state.partyCode} />
        ) : this.state.partyCode !== "" ? (
          <JoinRoom room={this.roomDetails} />
        ) : (
          <LandingPage
            loading={this.setLoadingflag}
            loggedIn={this.setLoggedInFlag}
            partyDetails={this.setPartyDetails}
          />
        )}
      </div>
    );
  }
}
