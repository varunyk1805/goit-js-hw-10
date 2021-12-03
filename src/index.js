import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(() => {
    let countryName = searchInput.value.trim();
    let valueSearchInput = searchInput.value;
    if (countryName === '') return;
    fetchCountries(countryName)
        .then(value => {
            let countryData = value;
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';

            if (countryData.length > 10) Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

            if (countryData.length > 1 && countryData.length <= 10) {
                const t = countryData.map(item =>
                    `<li>
                        <img src='${item.flags.svg}' height=14px/>
                        <span>${item.name.official}</span>
                    </li>`
                ).join('');
                countryList.insertAdjacentHTML('beforeend', t);
            };
            
            if (countryData.length === 1) {
                const t = countryData.map(item => {
                    const languages = Object.values(item.languages).join(', ');
                    return `<h1>
                                <img src='${item.flags.svg}' height=10px/>
                                <p>${item.name.official}</p>
                            </h1>
                            <h2>Capital: <span>${item.capital}</span></h2>
                            <h2>Population: <span>${item.population}</span></h2>
                            <h2>Languages: <span>${languages}</span></h2>`
                }).join('');
                countryInfo.insertAdjacentHTML('beforeend', t);
            };
        })
        .catch(error => {
            if (countryName === valueSearchInput.trim() && countryName !== valueSearchInput.trimLeft()) return;
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
            Notiflix.Notify.failure('Oops, there is no country with that name');
            console.log(error);
        });
}, DEBOUNCE_DELAY));