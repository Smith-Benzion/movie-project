

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


function getMovieInfo() {

       renderLoading();
       getMovies().then((movies) => {

           console.log(movies);

           let movieDisplay = ``;

           movies.forEach(({title, rating, id}) => {

               console.log(`ID: ${id}, Title: ${title}, Rating: ${rating}`);

               movieDisplay += `
               <ul>
                <li class="d-none">ID: ${id}</li>
                <li>Title: ${title}</li>
                <li>Rating: ${rating}</li>
              </ul>   
              <form>
                <button class="edit-info" data-id="${title}">Edit</button>
                <button class="save-button" data-id="">Save</button>
                <button class="delete-button" data-id="">Delete</button>
              </form>
              
              <div class=""></div>
              `;

            editMovieForm(movieDisplay);

           });
           //saveMovie();
           }).catch((error) => {
               console.log(error);
       });


}
    getMovieInfo();


function editMovieForm(movie) {
    $('#movie-display').html(movie);
    $('#loading').css('display', 'none');
    $('.edit-info').on('click', function(e) {
        e.preventDefault();
        let titleMovie = $(this).attr('data-id');
        console.log(titleMovie);

        $(this).parent().next().html(`
        <input type="text" value="${titleMovie}">
        <select class="movie-rating">
            <option value="1">1</option>
            <option value="1">2</option>
            <option value="1">3</option>
            <option value="1">4</option>
            <option value="1">5</option>
        </select>`);

    });
}

/*
function saveMovie() {

    $('#save-button').on('click', function(e) {
        e.preventDefault();

        let movieId = $(this).attr('data-id');
        let movieTitle = $(this).parent().next().children().first().val();
        let movieRating = $(this).parent().next().children().first().next().val();

        let movieObj = {
            title: `${movieTitle}`,
            rating: `${movieRating}`
        };

        console.log(movieObj);

        editMovie(movieObj, movieId);
        getMovieInfo();
    })
}


 */




















});