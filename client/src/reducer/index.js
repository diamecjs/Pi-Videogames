const initialState = {
    videogames: [],
    allVideogames: [],
    allgenres: [],
    platforms: [],
    details: {},
  };
  
  function rootReducer(state = initialState, action) {
    switch (action.type) {
  
      case "GET_VIDEOGAMES":
        let platforms = [];
        action.payload.map((e) => (platforms = [...platforms, ...e.platforms]));
        return {
          ...state,
          videogames: [...action.payload],
          allVideogames: [...action.payload],
          platforms: Array.from(new Set(platforms)),
          page: 1,
        };
  
      case "GET_NAME_VIDEOGAMES":
        return {
          ...state,
          videogames: action.payload,
        };
  
      case "GET_GENRES":
        return {
          ...state,
          allgenres: action.payload,
        };
  
        case "GET_DETAILS":
          return {
            ...state,
            details: action.payload
          };
          case 'CLEAR':
            return {
                ...state,
                details : action.payload
            }
  
  
      //_________________________________________FILTROS_____________________________________//
  
      case "FILTER_BY_GENRES":
        const allVideogames2 = state.allVideogames;
        const genresFilter =
          action.payload === "All"
            ? allVideogames2
            : allVideogames2.filter((e) => e.genres.includes(action.payload));
        return {
          ...state,
          videogames: genresFilter,
        };
  
      case "FILTER_CREATED":
        const allvideogames = state.allVideogames;
        const filterDb =
          action.payload === "created"
            ? allvideogames.filter((e) => e.inDb)
            : allvideogames.filter((e) => !e.inDb);
  
        return {
          ...state,
          videogames:
            action.payload === "all" ? state.allVideogames : filterDb,
        };
  
      case "ORDER_BY_RATING":
        const sorteArrRating =
          action.payload === "least"
            ? state.videogames.sort(function (a, b) {
                if (a.rating > b.rating) {
                  return 1;
                }
                if (b.rating > a.rating) {
                  return -1;
                }
                return 0;
              })
            : state.videogames.sort(function (a, b) {
                if (a.rating > b.rating) {
                  return -1;
                }
                if (b.rating > a.rating) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          videogames: sorteArrRating,
        };
  
      case "ORDER_BY_NAME":
        let sorteArrName =
          action.payload === "asc"
            ? state.videogames.sort(function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (b.name > a.name) {
                  return -1;
                }
                return 0;
              })
            : state.videogames.sort(function (a, b) {
                if (a.name > b.name) {
                  return -1;
                }
                if (b.name > a.name) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          videogames: sorteArrName,
        };
  
  
        default:
          return state;
    }
  }
  
  export default rootReducer;