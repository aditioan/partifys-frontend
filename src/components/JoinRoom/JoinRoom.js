import React, { Component } from "react";
import styles from "./joinroom.modules.css";

export default class index extends Component {
  render() {
    const room = this.props.room;
    return (
      <div className={styles.container}>
        <div>{room.partyName}</div>
        <nav></nav>
      </div>
    );
  }
}
