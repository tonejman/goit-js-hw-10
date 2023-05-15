export function fetchCountries(name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
      return response.ok ? response.json() : [];
    })
    .then(countriesRaw => {
      console.log('search by element:', name);

      return countriesRaw.map(el => {
        return {
          name: el.name.official,
          capital: el.capital && el.capital[0],
          population: el.population,
          flags: el.flags.svg,
          languages: el.languages,
        };
      });
    });
}
