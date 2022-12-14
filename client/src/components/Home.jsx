import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  filterByGenres,
  getGenres,
  filterCreated,
  orderByRating,
  orderByName
} from "../actions/index";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import NotFound from "./NotFound";
import "./Styles/Home.css";
import "./Styles/paginado.css";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const allgenres = useSelector((state) => state.allgenres);

  const [loading, setLoading] = useState(true);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamePerPage, setVideogamePerPage] = useState(15);
  const indexOfLasVideogame = currentPage * videogamePerPage;
  const indexOfFirstVideogame = indexOfLasVideogame - videogamePerPage;
  const currentVideogame = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLasVideogame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (allVideogames.length > 0 && loading) {
    setLoading(false);
  }

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  function handlePrev(e) {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
  }
  function handleNext(e) {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
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
    <div id="HomeGral">
      <h1 id="titulo">GAME WORLD</h1>
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
        <SearchBar />
        <div onChange={(e) => handleFilterGenres(e)}>
          <select id="select">
            <option value="All">All Genres</option>
            {allgenres?.map((e) => {
              return (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
        </div>
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

        <div id="cardHome">
          {currentVideogame?.length > 0 && !loading ? (
            currentVideogame?.map((el) => {
              return (
                <Card
                  key={el.id}
                  id={el.id}
                  name={el.name}
                  image={el.image ? el.image : el.background_image}
                  genres={el.genres}
                  rating={el.rating}
                  platforms={el.platforms}
                  released={el.released}
                  description={el.description}
                />
              );
            })
          ) : !currentVideogame.length > 0 && loading ? (
            <Loading />
          ) : (
            <NotFound />
          )}
        </div>

        <Paginado
          videogamePerPage={videogamePerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
          currentPage={currentPage}
        />
        <button
          id="pag"
          onClick={(e) => handlePrev(e)}
          disabled={currentPage <= 1}
        >
          {" "}
          Prev{" "}
        </button>

        <button
          id="pag"
          onClick={(e) => handleNext(e)}
          disabled={currentVideogame.length < 15}
        >
          {" "}
          Next{" "}
        </button>
      </div>
    </div>
  );
}