import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres } from "../actions/index";
import Card from "./Card";
import Paginado from "./Paginado";
import Loading from "./Loading";
import NotFound from "./NotFound";
import "./Styles/Home.css";
import "./Styles/paginado.css";
import NavBar from "./NavBar";
import SearchBar  from "./SearchBar";


export default function Home() {

  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const allgenres = useSelector((state) => state.allgenres);

  const [loading, setLoading] = useState(true);
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

  function handlePrev(e) {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
  }
  function handleNext(e) {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
  }

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div id="HomeGral">
      <h1 id="titulo">GAME WORLD</h1>
      <SearchBar />
      <NavBar />

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
      <ul id="ulHome">
                <button
        id="pagHome"
        onClick={(e) => handlePrev(e)}
        disabled={currentPage <= 1}
      >
        {" "}
        Prev{" "}
      </button>

      <button
        id="pagHome"
        onClick={(e) => handleNext(e)}
        disabled={currentVideogame.length < 15}
      >
        {" "}
        Next{" "}
      </button>
      </ul>
    </div>
  );
}
