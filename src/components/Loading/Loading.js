import React, { Component } from "react";
import Loader from "react-loader-spinner";
import styles from "./loading.module.css";
export default class Loading extends Component {
  render() {
    return (
      <div className={styles.home}>
        <div className={styles.centered}>
          <Loader type="Puff" color="#22bd4e" height={100} width={100} />
        </div>
      </div>
    );
  }
}
