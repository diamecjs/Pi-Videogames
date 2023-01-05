import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Card.css";

function Card({
  name,
  image,
  genres,
  rating,
  id,
  platforms,
  released,
  description,
  background_image,
}) {
  return (
    
    <div id="card">
    

        <h3 id="name">{name}</h3>

        <img id="img"
          src={image ? image : background_image}
          alt="Img not found"
          width="300px"
          height="200px"
        />
        <h5>🧩 Genre: {genres?.join(", ")}</h5>
        <h5>🌟 Rating: {rating}</h5>
          <Link to={`/details/${id}`}>
            <button id="MoreInfo">More information.. ➡️</button>
          </Link>
          </div>

     
     
  );
}
export default Card;