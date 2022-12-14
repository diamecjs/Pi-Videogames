import React from "react";
import {Link} from 'react-router-dom'
import "./Styles/LandingPage.css"

export default function LandingPage(){
    return(
        <div id="background">
            <h1 id="texto"> Welcome to the Game World</h1>
            <Link to = '/home'>
               <h1> <button id="boton">Enter 🎮  </button></h1>
            </Link>
        </div>
    )
}