import { listFromLocalStorage } from './localStorage.js'
import { addToLocalStorage } from './localStorage.js'

let myList = []
const movieList = document.getElementById('movie-list')

async function handleSubmit(){
    let searchValue = document.getElementById('search-bar').value
    let html = ''
    let watchlistIcon = ''

    const res = await fetch(`http://www.omdbapi.com/?apikey=51348fe2&s=${searchValue}`)
    const data = await res.json()
    if (data.Response == 'True') {
        for (const movieInfo of data.Search){
            const res = await fetch(`http://www.omdbapi.com/?apikey=51348fe2&i=${movieInfo.imdbID}`)
            const movie = await res.json()
    
            if(movie.Poster == 'N/A'){movie.Poster = './images/no-image.png'}
            
            if(listFromLocalStorage.indexOf(movie.imdbID) === -1){
                watchlistIcon = 'fa-circle-plus'
            } else {
                watchlistIcon = 'fa-circle-check'
            }
            
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
                            <button type="button" class="movie-watchlist-btn" data-movie-id="${movie.imdbID}">
                                <i class="fa-solid ${watchlistIcon} fa-inverse fa-lg"></i>
                                <p>Watchlist</p>
                            </button>
                        </div>
                        <p class="movie-desc">${movie.Plot}</p>
                    </div>
                </div>
            `
        }
        movieList.classList.remove('fill')
    } else {
        html = `
            <div class="movie-list-placeholder not-found-placeholder placeholder">
                <p>Unable to find what you’re looking for. Please try another search.</p>
            </div>
        `
    }
    
    movieList.innerHTML = html

}

document.getElementById('search-form').addEventListener('submit', e => {
    e.preventDefault()
    handleSubmit()
})

document.addEventListener('click', e=>{
    if(e.target.closest('.watchlist-btn')){
        let id = e.target.dataset.movieId ? e.target.dataset.movieId : e.target.parentElement.dataset.movieId
        addToLocalStorage(id, myList)
    }
})
