import React from "react";
import "./Styles/paginado.css"

export default function Paginado({
  videogamePerPage,
  allVideogames,
  paginado,
}) {
  const pageNumbers = [];


  for (let i = 1; i <= Math.ceil(allVideogames / videogamePerPage); i++) {
    pageNumbers.push(i);
  }

  return (

    <nav>
      <ul id="ul">
        {pageNumbers &&
          pageNumbers.map((number) => (

            <button onClick={() => paginado(number)} key={number}  id="pag">
              {number}
            </button>

          ))}
      </ul>
    </nav>

  );

}