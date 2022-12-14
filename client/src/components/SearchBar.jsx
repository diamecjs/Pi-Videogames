import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getNameVideogames } from "../actions/index";

import "./Styles/searchBar.css"

export default function SearchBar (){
    const dispatch = useDispatch ()
    const [name, setName] = useState('')

    function handleInputChange (e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit (e){
        e.preventDefault();
        if (name !== ''){
         dispatch(getNameVideogames(name))
         setName('')

        }

    }

    return (
        <div id="search">
            <input id="searchTerm"
            type='text'
            placeholder= 'Search...'
            value={name}
            onChange={(e) => handleInputChange(e)}
            />
            <button id="searchButton" type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )

}