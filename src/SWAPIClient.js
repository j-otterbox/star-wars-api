import axios from "axios";

const client = axios.create({
  baseURL: "https://swapi.dev/api/",
});

const SWAPIClient = {
  get,
  getPage,
};

async function get(category, queryStr) {
  const searchStr = `${category}/?search=${encodeURIComponent(queryStr)}`;
  const response = await client
    .get(searchStr)
    .then(async (resp) => {
      let results = resp.data.results;
      if (category === "people" || category === "species") {
        results = await getAdditionalData(results);
      }
      return results;
    })
    .catch((err) => {
      console.log(err);
      return "Oops, encountered a problem while requesting data from API...";
    });
  return response;
}

async function getAdditionalData(results) {
  // map returns an array of promises which are then resolved by .all()
  const response = await Promise.all(
    results.map(async (elem) => {
      if (elem.species.length > 0) {
        let speciesURI = elem.species[0];
        elem.species = await getName(speciesURI);
      }
      if (elem.homeworld) {
        let homeworldURI = elem.homeworld;
        elem.homeworld = await getName(homeworldURI);
      }
      return elem;
    })
  );
  return response;
}

async function getName(nameURI) {
  const name = await client
    .get(nameURI)
    .then((resp) => resp.data.name)
    .catch((err) => {
      console.log(err);
      return "Error while retrieving data...";
    });
  return name;
}

async function getPage(category, index) {
  const response = await client
    .get(`${category}?page=${index}`)
    .then(async (resp) => {
      let results = resp.data.results;
      if (category === "people" || category === "species") {
        results = await getAdditionalData(results);
      }
      return results;
    })
    .catch((err) => {
      console.log(err);
      return "Oops, encountered a problem while requesting data from API...";
    });
  return response;
}

export default SWAPIClient;
