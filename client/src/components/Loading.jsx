import React from "react";
import Loading from "./Styles/Loading.css";


export default function loading() {
    return (
        <div id="loading">
        <img id="imgL"
          src="https://64.media.tumblr.com/9976fc3fd9079bb417c8202faa01a733/tumblr_nkn9wvpOr11unqiwko1_400.gif"
          alt="Loading"
        />

        <h1 id="h1Loading">Loading...</h1>
      </div>
    );
  }