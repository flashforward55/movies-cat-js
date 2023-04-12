const apiKey = 'a1ddc73e-4075-4760-b274-e9e076923950';

const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
const options = {
    method: 'GET',
    headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
    },
};

fetch(url + 'top', options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
