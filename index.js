const apiKey = '780eec4ee085538c1428df78df020242';
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

fetch(apiUrl)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error ("Error al cargar los datos de la api");
    })

    .then(data => {
   const moviesContainer = document.getElementById('movies-container');
data.results.forEach(movie => {
    // Crear tarjeta
    const card = document.createElement('div');
    card.classList.add('card', 'text-bg-dark');
    card.style.width = '400px';
    card.style.margin = "5px";

    // Crear contenedor para la imagen con efecto de desenfoque
    const cardImgWrapper = document.createElement('div');
    cardImgWrapper.classList.add('card-img-wrapper');

    // Crear imagen de la tarjeta
    const cardImg = document.createElement('img');
    cardImg.classList.add('card-img-top');
    cardImg.src = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path;
    cardImg.alt = movie.title;

    // Adjuntar la imagen al contenedor de la imagen
    cardImgWrapper.appendChild(cardImg);

    // Crear overlay para el texto
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-img-overlay', 'd-flex', 'justify-content-center', 'align-items-center');

    // Crear título de la tarjeta
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title', 'text-center');
    cardTitle.textContent = movie.title;

    // Adjuntar título al overlay
    cardBody.appendChild(cardTitle);

    // Adjuntar contenedor de imagen y overlay al cuerpo de la tarjeta
    card.appendChild(cardImgWrapper);
    card.appendChild(cardBody);

    // Adjuntar tarjeta al contenedor de películas
    moviesContainer.appendChild(card);
});

    })
    .catch(error => {
        console.error('Error:', error);
    });
