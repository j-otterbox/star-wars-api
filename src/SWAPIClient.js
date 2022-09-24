import axios from "axios";

const client = axios.create({
  baseURL: "https://swapi.dev/api/",
  timeout: 1000,
});

const SWAPIClient = {
  get,
};

async function get(category, queryStr) {
  const uri = `${category}/?search=${encodeURIComponent(queryStr)}`;
  const response = await client
    .get(uri)
    .then(async (resp) => {
      if (category === "people" || category === "species") {
        // get name of species and homeworld from given URIs in each elem of response
        await Promise.all(
          resp.data.results.map(async (elem) => {
            const { species, homeworld } = await getSpeciesAndOrHomeworld(elem);
            elem.species = species;
            elem.homeworld = homeworld;
            return elem;
          })
        ).then((results) => {
          resp.data.results = results; // set results prop to new array
        });
      }
      return resp;
    })
    .catch((err) => {
      return err;
    });
  return response;
}

async function getSpeciesAndOrHomeworld(elem) {
  const names = {
    species: "",
    homeworld: "",
  };

  if (elem.species.length > 0) {
    let uri = elem.species[0];
    names.species = await getName(uri);
  }
  if (elem.homeworld) {
    let uri = elem.homeworld;
    names.homeworld = await getName(uri);
  }
  return names;
}

async function getName(uri) {
  const name = await client
    .get(uri)
    .then((resp) => {
      return resp.data.name;
    })
    .catch((err) => {
      return "Error";
    });
  return name;
}

export default SWAPIClient;
