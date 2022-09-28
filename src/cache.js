export function getCache() {
  return JSON.parse(localStorage.getItem("cache"));
}

export function refreshCache(data) {
  const newCache = {
    data,
    expirationDate: getExpirationDate(),
  };
  localStorage.setItem("cache", JSON.stringify(newCache));
}

function getExpirationDate() {
  const today = new Date();
  return new Date(today.setDate(today.getDate() + 3));
}

export function isExpired(date) {
  const today = new Date();
  const expirationDate = new Date(date);
  return today > expirationDate;
}
