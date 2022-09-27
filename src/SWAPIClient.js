import axios from "axios";

const client = axios.create({
  baseURL: "https://swapi.dev/api/",
  timeout: 10000,
});

// !A-OK
const SWAPIClient = {
  get,
  getPage,
};

// ! A-OK
async function get(category, queryStr) {
  const uri = `${category}/?search=${encodeURIComponent(queryStr)}`;
  const results = await client
    .get(uri)
    .then(async (response) => {
      let results = response.data.results;
      if (category === "people" || category === "species") {
        results = await getAdditionalData(results);
      }
      return results;
    })
    .catch(() => null);
  return results;
}

// ! A-OK
async function getAdditionalData(results) {
  // map returns an array of promises which are then resolved by .all()
  return await Promise.all(
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
}

// ! A-OK
async function getName(uri) {
  const name = await client
    .get(uri)
    .then((resp) => {
      return resp.data.name;
    })
    .catch((err) => {
      return "Error while retrieving...";
    });
  return name;
}

// ! A-OK
async function getPage(category, index) {
  console.log(category, index);

  const response = await client
    .get(`${category}?page=${index}`)
    .then(async (response) => {
      let results = response.data.results;
      if (category === "people" || category === "species") {
        results = await getAdditionalData(results);
      }
      return results;
    })
    .catch(() => null);
  return response;
}

export default SWAPIClient;
