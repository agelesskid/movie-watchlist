import { listFromLocalStorage } from './localStorage.js'
import { removeFromLocalStorage } from './localStorage.js'

async function renderWatchlist(){
    let html = ''

    for (const imdbID of listFromLocalStorage) {
        console.log(imdbID)
        const res = await fetch(`http://www.omdbapi.com/?apikey=51348fe2&i=${imdbID}`)
        const movie = await res.json()
        
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
                            <i class="fa-solid fa-circle-minus fa-inverse fa-lg" data-movieID="${movie.imdbID}"></i>
                            <p data-movieID="${movie.imdbID}">Watchlist</p>
                        </button>
                    </div>
                    <p class="movie-desc">${movie.Plot}</p>
                </div>
            </div>
        `
    }

    document.getElementById('movie-list').innerHTML = html
}

document.addEventListener('click', e=>{
    if(e.target.dataset.movieid){
        removeFromLocalStorage(e.target.dataset.movieid)
        renderWatchlist()
    }
})

renderWatchlist()