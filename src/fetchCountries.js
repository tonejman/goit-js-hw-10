export function fetchCountries(name) {
  console.log('search by element:', name);
  if (name.length > 0) {
    return fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=languages,capital,population,name,flags`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}
