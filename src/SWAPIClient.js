import axios from "axios";

const client = axios.create({
  baseURL: "https://swapi.dev/api/",
  timeout: 7000,
});

const SWAPIClient = {
  get,
};

async function get(baseUrl, category, urlParams) {
  let url = baseUrl;

  if (urlParams) {
    let queryString;

    for (const [key, value] of Object.entries(urlParams)) {
      if (!queryString) queryString = `${category}/?${key}=${value}`;
      else queryString += `&${key}=${value}`;
    }

    url += queryString;
  }

  const response = await client
    .get(url)
    .then(async (resp) => {
      let requiresAdditionalData;

      requiresAdditionalData =
        /(?<=\/api\/)people\//.test(url) ||
        /(?<=\/api\/)species\//.test(url) ||
        category === "people" ||
        category === "species";

      if (requiresAdditionalData) {
        resp.data.results = await getAdditionalData(resp.data.results);
      }
      return resp;
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
        elem.species = await getName(speciesUrl);
      }
      if (elem.homeworld) {
        let homeworldUrl = elem.homeworld;
        elem.homeworld = await getName(homeworldUrl);
      }
      return elem;
    })
  );
  return response;
}

async function getName(url) {
  const name = await client
    .get(url)
    .then((resp) => resp.data.name)
    .catch((err) => {
      return "Error while retrieving data...";
    });
  return name;
}

export default SWAPIClient;
