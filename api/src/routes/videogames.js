const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genres } = require("../db");
const { API_KEY } = process.env;
const router = Router();

const getApiInfo = async () => {
  let gamesArr = [];
  let urlApi = `https://api.rawg.io/api/games?key=${API_KEY}`;
  try {
    for (let i = 0; i < 5; i++) {
      const urlData = await axios.get(urlApi); 
      urlData.data.results 
      .map((e) => {         
          gamesArr.push({
            id: e.id,
            name: e.name,
            image: e.background_image,
            released: e.released,
            rating: e.rating,
            platforms: e.platforms.map((e) => e.platform.name),
            genres: e.genres.map((e) => e.name),
          });
        });
      urlApi = urlData.data.next;
    }
    return gamesArr; 
  } catch (error) {
    console.log("Error en getApiInfo", error); 
  }
};

const getDbInfo = async () => {
  //traigo todos los juegos que hay en mi db con su relacion generos
  const GamesdB = await Videogame.findAll({
    include: {
      model: Genres,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const newGamedB = await GamesdB.map((e) => {
    //le paso un map para q me pase un nuevo array solo con esas propiedades
    return {
      id: e.id,
      name: e.name,
      image: e.image,
      released: e.released,
      rating: e.rating,
      platforms: e.platforms,
      genres: e.genres.map((el) => el.name),
      inDb: e.inDb,
    };
  });
  return newGamedB;
};

const getAllVideogames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = dbInfo.concat(apiInfo);
  return infoTotal;
};

router.get("/", async (req, res) => {
  const { name } = req.query;
  const allVideogame = await getAllVideogames(); //creo por fuera la const para llamarla si no me pasan name en el else abajo de todo
  if (name) {
    const videogameName = await allVideogame.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    return videogameName
      ? res.status(200).send(videogameName)
      : res.status(404).send("The videogame was not found");
  }else{
  return res.status(200).json(allVideogame);
}});

router.get('/:id', async ( req, res) => {
  const {id} = req.params;
  // Los juegos de la api son numeros los de la base de datos no lo son 
  if(isNaN(id)) {
      const game = await Videogame.findByPk(id, {include: Genres })
      res.status(200).json(game)

  }else{
      const gameApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

      const result = {
          id: gameApi.data.id,
          name: gameApi.data.name,
          description: gameApi.data.description,
          image:gameApi.data.background_image,
          released: gameApi.data.released,
          genres: gameApi.data.genres.map(gen => { return { id: gen.id, name: gen.name } }),
          rating: gameApi.data.rating,
          platforms: gameApi.data.platforms.map((el) => el.platform.name)
      }
      res.status(200).json(result)
  }

})
  


router.post("/", async (req, res) => {

    const {name,image ,description, released, rating, platforms, genres} = req.body
    try{
    let newGame = await Videogame.create({
        name, image, description, released, rating, platforms
    })
    let genInDb = await Genres.findAll({
        where: {
            name: genres
        }
    })
    await newGame.addGenre(genInDb)
    res.send('New game created')
  
  } catch (error) {
    console.log("RUTA POOST", error);
  }
});

module.exports = router;