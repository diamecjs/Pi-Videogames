import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterByGenres,
  getGenres,
  filterCreated,
  orderByRating,
  orderByName,
} from "../actions/index";
import "./Styles/NavBar.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const allgenres = useSelector((state) => state.allgenres);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  function handleFilterGenres(e) {
    dispatch(filterByGenres(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  function handleRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  return (
    <div id="container">
      <Link to="/videogames">
        <button id="btnCrea">Create Videogame</button>
      </Link>
      <button
        id="reload"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reload Videogames
      </button>

      <div>
        <select id="select" onChange={(e) => handleFilterGenres(e)}>
          <option value="All">All Genres</option>
          {allgenres?.map((e) => {
            return (
              <option key={e.id} value={e.name}>
                {e.name}
              </option>
            );
          })}
        </select>

        <select id="select" onChange={(e) => handleSort(e)}>
          <option>Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <select id="select" onChange={(e) => handleRating(e)}>
          <option>Select Rating</option>
          <option value="least">Least Popular</option>
          <option value="most">Most Popular</option>
        </select>
        <select id="select" onChange={(e) => handleFilterCreated(e)}>
          <option value="all">All Video Games</option>
          <option value="api">Existing</option>
          <option value="created">Created</option>
        </select>
      </div>
    </div>
  );
}
