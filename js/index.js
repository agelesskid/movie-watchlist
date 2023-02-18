import {listFromLocalStorage} from './watchlist.js'

let myList = []

async function handleSubmit(){
    let searchValue = document.getElementById('search-bar').value
    let html = ''

    const res = await fetch(`http://www.omdbapi.com/?apikey=51348fe2&s=${searchValue}`)
    const data = await res.json()
    if (data.Response == 'True') {
        for (const movieInfo of data.Search){
            const res = await fetch(`http://www.omdbapi.com/?apikey=51348fe2&i=${movieInfo.imdbID}`)
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
                                <i class="fa-solid fa-circle-plus fa-inverse fa-lg" data-movieID="${movie.imdbID}"></i>
                                <p data-movieID="${movie.imdbID}">Watchlist</p>
                            </button>
                        </div>
                        <p class="movie-desc">${movie.Plot}</p>
                    </div>
                </div>
            `
        }
    } else {
        html = `
            <div class="movie-list-placeholder" style="color: #787878; max-width: 60%;">
                <p>Unable to find what you’re looking for. Please try another search.</p>
            </div>
        `
    }
    
    document.getElementById('movie-list').innerHTML = html

}

function addToLocalStorage(id){
    if(listFromLocalStorage){
        myList = listFromLocalStorage
    }
    myList.push(id)
    localStorage.setItem('myList', JSON.stringify(myList))
    console.log(localStorage)
    
}

document.getElementById('search-form').addEventListener('submit', e => {
    e.preventDefault()
    handleSubmit()
})

document.addEventListener('click', e=>{
    if(e.target.dataset.movieid){
        addToLocalStorage(e.target.dataset.movieid)
    }
})
