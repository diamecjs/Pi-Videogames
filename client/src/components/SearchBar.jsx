import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogames } from "../actions/index";

import "./Styles/searchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name !== "") {
      dispatch(getNameVideogames(name));
      setName("");
    }
  }

  return (
    <div id="search">
      <input
        id="searchTerm"
        type="text"
        placeholder="Search..."
        value={name}
        onChange={(e) => handleInputChange(e)}
      />
      <img
        id="searchButton"
        src="https://cdn-icons-png.flaticon.com/512/2397/2397983.png"
        width="50px"
        height="50px"
        onClick={(e) => handleSubmit(e)}
      ></img>
      {/* <button id="searchButton" type="submit" onClick={(e) => handleSubmit(e)}>🔎</button> */}
    </div>
  );
}
