

//Get movie data
const getMovies = function() {
    return fetch('https://flash-checkered-play.glitch.me/movies')
        .then(response => response.json());
}

//Create new movie
const createMovie = function(movieObj) {
    fetch("https://flash-checkered-play.glitch.me/movies", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieObj),
    })
        .then( response => response.json() )
        .then( data => console.log(data) )
        .catch( error => console.error(error));
}

//Edit movie
const editMovie = function(movieObj, id) {
    console.log(`ID is: ${id}`);
    fetch(`https://flash-checkered-play.glitch.me/movies/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieObj),
    })
        .then( response => response.json().then( data => {
            console.log(`Edited movie data JSON: ${data}`);
        }) )
        .catch( error => console.error(error));

}

//Delete movie
const deleteMovie = function(id) {
    fetch(`https://flash-checkered-play.glitch.me/movies/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then( response => response.json() )
        .then( data => console.log(`Deleted movie JSON: ${data}`) )
        .catch( error => console.error(error));
}


$(document).ready( () => {



    //Render the loading thing
    function renderLoading() {
        $('#movie-display').html('<p id="loading" class="mt-5 text-center"><span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span><span>.</span><span>.</span><span>.</span></p>')
    }

    renderLoading();


























});