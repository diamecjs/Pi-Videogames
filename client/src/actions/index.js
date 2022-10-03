import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/videogames");
      return dispatch({
        type: "GET_VIDEOGAMES",
        payload: json.data,
      });
    } catch (error) {
      console.log("Error en getVideogames/actions", error);
    }
  };
}

export function getNameVideogames(name) {
  return async function (dispatch){
      try {
          var json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
          return dispatch ({
              type:'GET_NAME_VIDEOGAMES',
              payload: json.data
          })
      }catch (error) {
          console.log(error);
      }
  }
}


export function getGenres(){
  return async function(dispatch){
    try{
      var info = await axios.get('http://localhost:3001/genres')
      return dispatch({
          type: 'GET_GENRES',
          payload: info.data 
      });
    }catch (error){
      console.log("Error en getGenres/actions", error);
    }
  };
};

export function postVideogame (payload){
  return async function (dispatch){
      const response = await axios.post('http://localhost:3001/videogames', payload);
      return response;
  }
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/videogames/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data
      });
      } catch (error) {
          console.log("ERROR EN GET DETAILS/ACTION",error)
          
      }
  }
}


//_________________________________________________FILTROS______________________________________________________________//

export function filterByGenres(payload) {
  console.log(payload);
  return {
    type: "FILTER_BY_GENRES",
    payload,
  };
}

export function filterCreated (payload){
  return{
      type: 'FILTER_CREATED',
      payload
  }
}

export function orderByRating(payload){
  return {
      type: 'ORDER_BY_RATING',
      payload,        
  };
}

export function orderByName (payload){
  return {
      type : 'ORDER_BY_NAME',
      payload
  }
}

export function clear(){
  return{
      type: 'CLEAR',
      payload : []
  }
}

