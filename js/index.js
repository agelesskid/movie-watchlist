const movieListPlaceholderHtml = `
    <div class="movie-list-placeholder">
        <i class="fa-solid fa-film fa-5x"></i>
        <p>Start exploring</p>
    </div>
`

let movieList = []
let movieListHtml = ''

async function handleSubmit(){
    let searchValue = document.getElementById('search-bar').value

    fetch(`http://www.omdbapi.com/?apikey=51348fe2&s=${searchValue}`)
        .then(res=>res.json())
        .then(data=>{
            data.Search.forEach(movieInfo => {
                fetch(`http://www.omdbapi.com/?apikey=51348fe2&i=${movieInfo.imdbID}`)
                    .then(res=>res.json())
                    .then(data=>{
                        movieList.push(data)
                        movieListHtml = getMovieListHtml()
                        renderMovieList()
                }) 
            })
        })
    
    movieList = []
}

function getMovieListHtml(){
    let html = ''

    movieList.forEach(movie => {
        if(movie.Poster == 'N/A'){movie.Poster = './images/no-image.png'}
        html += `
            <div class="movie">
                <img class="movie-banner" src="${movie.Poster}" alt="Movie banner">
                <div class="movie-content">
                    <div class="movie-rating-wrapper">
                        <h3 class="movie-name">${movie.Title}</h3>
                        <i class="fa-solid fa-star rating-star fa-sm"></i>
                        <p class="rating-score">${movie.imdbRating}</p>
                    </div>
                    <div class="movie-info-wrapper">
                        <p>${movie.Runtime}</p>
                        <p>${movie.Genre}</p>
                        <button type="button" data-movieID="${movie.imdbID}">
                            <i class="fa-solid fa-circle-plus fa-inverse fa-lg"></i>
                            <p>Watchlist</p>
                        </button>
                    </div>
                    <p class="movie-desc">${movie.Plot}</p>
                </div>
            </div>
        `
    })
    
    return html
}

function renderMovieList(){
    document.getElementById('movie-list').innerHTML = movieListHtml
}

document.getElementById('search-form').addEventListener('submit', e => {
    e.preventDefault()
    handleSubmit()
})
