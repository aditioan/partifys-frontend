import React, { Component } from "react";
import styles from "./home.module.css";
export default class Home extends Component {
  render() {
    let roomNumver = this.props.room;

    return (
      <div className={styles.home}>
        <div className={styles.centered}>
          Welcome to the party
          <button>Go to your room {roomNumver}</button>
        </div>
      </div>
    );
  }
}
