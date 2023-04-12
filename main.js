// Настройки
const apiKey = 'a1ddc73e-4075-4760-b274-e9e076923950';
const url = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
const options = {
    method: 'GET',
    headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
    },
};

// DOM элементы
const filmsWrapper = document.querySelector('.films');
const loader = document.querySelector('.loader-wrapper');
const btnShowMore = document.querySelector('.show-more');
btnShowMore.onclick = fetchAndRenderFilms;

let page = 1;

// Получение и вывод ТОП 250 фильмов
async function fetchAndRenderFilms() {
    // Show preloader
    loader.classList.remove('none');

    // Fetch films data
    const data = await fetchData(url + `top?page=${page}`, options);
    if (data.pagesCount > 1) page++;

    // Отображаем кнопку если страниц больше чем 1
    if (data.pagesCount > 1) btnShowMore.classList.remove('none');

    // Hide preloader
    loader.classList.add('none');

    // Render films on page
    renderFilms(data.films);

    // Скрыть кнопку если следующей страницы не существует
    if (page > data.pagesCount) btnShowMore.classList.add('none');
}

async function fetchData(url, options) {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}

function renderFilms(films) {
    for (film of films) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = film.filmId;

        card.onclick = openFilmDetails;

        const html = `
                    <img src=${film.posterUrlPreview} alt="Cover" class="card__img">
                    <h3 class="card__title">${film.nameRu}</h3>
                    <p class="card__year">${film.year}</p>
                    <p class="card__rate">Рейтинг: ${film.rating}</p>
                `;

        card.insertAdjacentHTML('afterbegin', html);

        filmsWrapper.insertAdjacentElement('beforeend', card);
    }
}

async function openFilmDetails(e) {
    // Достаем id фильма
    const id = e.currentTarget.id;

    // Получаем данные фильма
    const data = await fetchData(url + id, options);
    console.log(data);
}

fetchAndRenderFilms().catch(err => console.log(err));
