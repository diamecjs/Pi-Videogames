import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetail, clear } from "../actions/index";
import "./Styles/Details.css"

export default function Details(props) {
  const dispatch = useDispatch();
  const {id} = useParams();
  const myVideogame = useSelector((state) => state.details);

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(clear());
    };
  }, [dispatch, id]);
  return (
    <div id="general">
      <div key={myVideogame.id} id="fondo">
        <h1 id="nombre">{myVideogame.name}</h1>
        <div  id="h4">
          <h4>🌟 Rating: {myVideogame.rating} </h4>
          <h4>📆 Released: {myVideogame.released}</h4>
          <h4>
            🧩 Genres:
            {myVideogame.genres?.map((genre, i) => (
              <li key={i}>{genre.name}</li>
            ))}
          </h4>
          <h4> 📜 Description:</h4> <p> <div dangerouslySetInnerHTML={{__html: myVideogame.description?.slice(0,1000)}}>
            </div></p>
          <h4>
            🎮 Platforms:{" "}
            {myVideogame.platforms
              ? myVideogame.platforms + " "
              : myVideogame.platforms?.map((pl, i) => (
                  <li key={i}>{pl.name}</li>
                ))}
          </h4>
        <img id="image"
          src={myVideogame.background_image? myVideogame.background_image : myVideogame.image}
          alt=""
          width="450px"
          height="350px"
        />
        </div>
      </div>
        <Link to="/home">
          <button id="botondetail">Go Home</button>
        </Link>
    </div>
  );
}