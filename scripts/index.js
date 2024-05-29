const apiKey = '780eec4ee085538c1428df78df020242';
const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;

let currentPage = 1;
const cardsPerPage = 6;
let totalMovies = 0;
let currentSearchTerm = '';

const fetchMovies = (url) => {
    fetch(`${url}&page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            totalMovies = data.total_results;
            const moviesContainer = document.getElementById('movies-container');
            moviesContainer.innerHTML = ''; // Limpiar contenedor antes de agregar nuevas películas
            const moviesToShow = data.results.slice(0, cardsPerPage); // Mostrar solo las primeras 6 tarjetas
            moviesToShow.forEach((movie, index) => {
                const card = createCard(movie, index);
                moviesContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

const createCard = (movie, index) => {
    const card = document.createElement('div');
    card.classList.add('card', 'text-bg-dark');
    card.style.width = '400px';
    card.style.margin = "5px";
    card.style.padding = '0';
    card.style.borderRadius = "10px";

    const cardImgWrapper = document.createElement('div');
    cardImgWrapper.classList.add('card-img-wrapper');

    const cardImg = document.createElement('img');
    cardImg.classList.add('card-img-top');
    cardImg.src = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path;
    cardImg.alt = movie.title;
    cardImgWrapper.appendChild(cardImg);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-img-overlay', 'd-flex', 'justify-content-center', 'align-items-center');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title', 'text-center');
    cardTitle.textContent = movie.title;
    cardBody.appendChild(cardTitle);

    card.appendChild(cardImgWrapper);
    card.appendChild(cardBody);

    card.addEventListener('click', () => {
        showMovieDetail(movie);
    });

    return card;
};

const showMovieDetail = (movie) => {
    Swal.fire(`
    Título: ${movie.title}
    Descripción: ${movie.overview}
    Calificación: ${movie.vote_average}`);
};

const showNextPage = () => {
    if ((currentPage * cardsPerPage) < totalMovies) {
        currentPage++;
        fetchMovies(currentSearchTerm ? searchUrl + currentSearchTerm : nowPlayingUrl);
    }
};

const showPreviousPage = () => {
    if (currentPage > 1) {
        currentPage--;
        fetchMovies(currentSearchTerm ? searchUrl + currentSearchTerm : nowPlayingUrl);
    }
};

document.getElementById('nextBtn').addEventListener('click', showNextPage);
document.getElementById('prevBtn').addEventListener('click', showPreviousPage);

document.getElementById('searchForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;
    currentSearchTerm = searchInput;
    currentPage = 1; // Reset to first page for new search
    fetchMovies(searchUrl + currentSearchTerm);
});

fetchMovies(nowPlayingUrl);
