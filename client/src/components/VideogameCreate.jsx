import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getVideogames } from "../actions";
import { Link, useHistory } from "react-router-dom";
import "./Styles/VideogameCreated.css";



function CreatedVideogame() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.allgenres);
  const platforms = useSelector((state) => state.platforms);
  const allVideogames= useSelector((state) => state.allVideogames)
  const [errors, setErrors] = useState({});


 
let validateUrl = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;

function validate(input) {

  let errors = {};

  if (!input.name.trim()) {
    errors.name = "Enter a correct name";
  } else if (
    allVideogames.find(
      (e) =>
        e.name.toLowerCase().trim() === input.name.toLocaleLowerCase().trim()
    )
  ) {
    errors.name = `The ${input.name} already exists`;
  } else if (
    input.description === "number" ||
    input.description.length < 10 ||
    input.description.trim() === ""
  ) {
    errors.description = "Enter a correct description";
  } else if (input.released.trim() === "") {
    errors.released = "Enter a date";
  } else if (!input.image || !validateUrl.test(input.image)) {
    errors.image = "This is not a valid URL";
  } else if (input.released < "1950 - 01- 01") {
    errors.released = "The date cannot be less than 1950 - 01- 01";
  } else if (input.rating === "" || input.rating < 1 || input.rating > 6) {
    errors.rating = "Enter a rating";
  } else if (input.genres.length === 0) {
    errors.genres = "Select one or more genres";
  } else if (input.platforms.length === 0) {
    errors.platforms = "Select one or more platforms";
  }
  return errors;
}


  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideogames());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value, // setea el valor del target.
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectGenres(e) {
    setInput({
      ...input,
      genres: [...new Set([...input.genres, e.target.value])],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectPlatforms(e) {
    setInput({
      ...input,
      platforms: [...new Set([...input.platforms, e.target.value])],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  const handleDeleteGenres = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((el) => el !== e),
    });
  };
  const handleDeletePlatforms = (e) => {
    setInput({
      ...input,
      platforms: input.platforms.filter((el) => el !== e),
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validate(input));
    let error = validate(input);
    if (Object.values(error).length !== 0) {
    } else {
    dispatch(postVideogame(input));
    alert("A new VideoGame has been created");
    setInput({
      name: "",
      image: "",
      description: "",
      released: "",
      rating: "",
      genres: [],
      platforms: [],
    });
    history.push("/home");
  }
}

return (
  <div id="generalForm">
    <h2 id="h2">Create your Video Game</h2>
    <form id="form" onSubmit={handleSubmit}>
      <div>
        <label id="label">Name: </label>
        <input
          id="input"
          type="text"
          value={input.name}
          name="name"
          onChange={handleChange}
        />
         {errors.name && <h4 id="error">{errors.name}</h4>}
      </div>
      <div>
        <label id="label">Image: </label>
        <input
          id="input"
          type="text"
          value={input.image}
          name="image"
          onChange={handleChange}
        />
         {errors.image && <h4 id="error">{errors.image}</h4>}
      </div>
      <div>
        <label id="label">Released: </label>
        <input
          id="input"
          type="date"
          value={input.released}
          name="released"
          onChange={handleChange}
        />
         {errors.released && <h4 id="error">{errors.released}</h4>}
      </div>
      <div>
        <label id="label">Rating: </label>
        <input
          id="input"
          type="number"
          value={input.rating}
          name="rating"
          min={1}
          max={6}
          onChange={handleChange}
        />
         {errors.rating && <h4 id="error">{errors.rating}</h4>}
      </div>
      <br></br>
      <div>
        <label id="label">Description: </label>
        <textarea
          id="input"
          type="text"
          value={input.description}
          name="description"
          onChange={handleChange}
        />
         {errors.description && <h4 id="error">{errors.description}</h4>}
      </div>
      <div>
        <label id="label">Genres </label>
        <select id="selectform" onChange={(el) => handleSelectGenres(el)}>
          <option disabled selected>
            Select genres
          </option>
          {genres?.map((e) => (
            <option value={e.name} key={e.id}>
              {e.name}
            </option>
          ))}
        </select>
        {errors.genres && <h4 id="error">{errors.genres}</h4>}
        <ul>
          {input.genres.map((e) => (
            <li>
              <div>{e + ""}</div>
              <button id="pag" value={e} onClick={() => handleDeleteGenres(e)}>
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <label id="label">Platforms </label>
        <select id="selectform" onChange={(el) => handleSelectPlatforms(el)}>
          <option disabled selected>
            {" "}
            Select Platform
          </option>

          {platforms?.map((e) => (
            <option value={e} key={e.id}>
              {e}
            </option>
          ))}
        </select>
        {errors.platforms && <h4 id="error">{errors.platforms}</h4>}
        <ul>
          {input.platforms.map((e) => (
            <li>
              <div>{e + ""}</div>
              <button
                id="pag"
                value={e}
                onClick={() => handleDeletePlatforms(e)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button id="botonform" type="submit">
        Create Video Game
      </button>
      <br></br>
      <br></br>
      <div>
        <Link to="/home">
          <button id="botonform">Go Back Home </button>
        </Link>
      </div>
    </form>
  </div>
);
}
export default CreatedVideogame;
