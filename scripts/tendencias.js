const apiKey = "780eec4ee085538c1428df78df020242";
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

let currentPage = 1;
const cardsPerPage = 12;
let totalMovies = 0;

const fetchMovies = () => {
    fetch(`${apiUrl}&page=${currentPage}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Error al cargar los datos de la API");
        })
        .then(data => {
            totalMovies = data.total_results;
            const moviesContainer = document.getElementById('movies-container');
            moviesContainer.innerHTML = ''; // Limpiar contenedor antes de agregar nuevas películas
            const moviesToShow = data.results.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);
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

    card.style.display = (index < cardsPerPage) ? 'block' : 'none'; // Mostrar solo las primeras 8 tarjetas

    // Agregar event listener para mostrar detalles al hacer clic en la tarjeta
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

fetchMovies();
