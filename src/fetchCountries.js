export const fetchCountries = name => {
    const filterParams = `fields=name,capital,population,flags,languages`;
    return fetch(`https://restcountries.com/v3.1/name/${name}?${filterParams}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
};