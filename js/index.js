const movieListPlaceholderHtml = `
    <div class="movie-list-placeholder">
        <i class="fa-solid fa-film fa-5x"></i>
        <p>Start exploring</p>
    </div>
`

const movieHtml = `
    <div class="movie">
        <img class="movie-banner" src="./images/movie-poster.jpg" alt="Movie banner">
        <div class="movie-content">
            <div class="movie-rating-wrapper">
                <h3 class="movie-name">Blade Runner</h3>
                <i class="fa-solid fa-star rating-star fa-sm"></i>
                <p class="rating-score">8.1</p>
            </div>
            <div class="movie-info-wrapper">
                <p>116 min</p>
                <p>Drama, Mystery, Sci-fi</p>
                <button type="button">
                    <i class="fa-solid fa-circle-plus fa-inverse fa-lg"></i>
                    <p>Watchlist</p>
                </button>
            </div>
            <p class="movie-desc">
                A blade runner must pursue and terminate four
                replicants who stole a ship in space,
                and have returned to Earth to find their creator.
            </p>
        </div>
    </div>
`