import axios from "axios";

const client = axios.create({
  baseURL: "https://swapi.dev/api/",
});

const SWAPIClient = {
  get,
  getPage,
};

async function get(category, params) {
  const query = `${category}/?search=${encodeURIComponent(params)}`;
  const response = await client
    .get(query)
    .then(async (resp) => {
      let results = resp.data.results;
      if (category === "people" || category === "species") {
        results = await getAdditionalData(results);
      }
      return results;
    })
    .catch((err) => {
      return "Oops, encountered a problem while requesting data from API...";
    });
  return response;
}

async function getAdditionalData(results) {
  // map returns an array of promises which are then resolved by .all()
  const response = await Promise.all(
    results.map(async (elem) => {
      if (elem.species.length > 0) {
        let speciesUrl = elem.species[0];
        elem.species = await getNameFromUrl(speciesUrl);
      }
      if (elem.homeworld) {
        let homeworldUrl = elem.homeworld;
        elem.homeworld = await getNameFromUrl(homeworldUrl);
      }
      return elem;
    })
  );
  return response;
}

async function getNameFromUrl(url) {
  const name = await client
    .get(url)
    .then((resp) => resp.data.name)
    .catch((err) => {
      return "Error while retrieving data...";
    });
  return name;
}

async function getPage(category, pageIndex) {
  const response = await client
    .get(`${category}?page=${pageIndex}`)
    .then(async (resp) => {
      let results = resp.data.results;
      if (category === "people" || category === "species") {
        results = await getAdditionalData(results);
      }
      return results;
    })
    .catch((err) => {
      return "Oops, encountered a problem while requesting data from API...";
    });
  return response;
}

export default SWAPIClient;
