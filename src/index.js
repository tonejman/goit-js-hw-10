'use strict';
import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const countryFilter = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function handleCountryFilter(filter) {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (filter.length > 10) {
    Notiflix.Notify.info(`Number of matches found: ${filter.length}`);
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (filter.length >= 2 && filter.length <= 10) {
    // eslint-disable-next-line no-use-before-define
    let currentFoundCountries = document.createElement('p');
    currentFoundCountries.insertAdjacentHTML(
      'beforeend',
      `<p class="info-heading">List of country names matches. Found: ${filter.length}</p>`
    );

    countryList.append(currentFoundCountries), displayCountryList(filter);
  } else if (filter.length === 1) {
    const CountryObj = filter[0];
    // eslint-disable-next-line no-use-before-define
    displayCountryInfo(CountryObj);
  } else {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
}

function displayCountryList(filter) {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < filter.length; i++) {
    const country = filter[i];
    const countryFlag = country.flags;
    const countryName = country.name;

    const renderCountriesList = document.createElement('li');
    renderCountriesList.insertAdjacentHTML(
      'beforeend',
      `<div><img src="${countryFlag}"width="40" alt="${countryName} flag">
      <b><span>${countryName}</span></div>`
    );
    countryList.append(renderCountriesList);
  }
}

function displayCountryInfo(item) {
  const countryFlag = item.flags;
  const countryName = item.name;
  const countryCapital = item.capital;
  const countryPopulation = item.population;
  const countryLanguages = item.languages;

  countryInfo.insertAdjacentHTML(
    'beforeend',
    `<p class="info-heading">Details of the selected country</p>
    <div class="country-info__item">
    <img
    src="${countryFlag}"width="70" 
    alt="${countryName} flag"><b>
    <span class="country-name">${countryName}</span></b>
    <p><b>Capital: </b>${countryCapital}</p>
    <p><b>Population: </b>${countryPopulation}</p>
    <p><b>Languages: </b>${Object.values(countryLanguages)}</p></div>`
  );
}

countryFilter.addEventListener(
  'input',
  debounce(() => {
    const trimmerCountryFilterValue = countryFilter.value.trim();
    fetchCountries(trimmerCountryFilterValue).then(item => {
      handleCountryFilter(item);
      console.log(item);
    });
  }, DEBOUNCE_DELAY)
);
