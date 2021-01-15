

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
            <div class="text-center">
               <ul style="margin-right: 3em">
                <li class="d-none">ID: ${id}</li>
                <li>Title: ${title}</li>
                <li>Rating: ${rating}/5</li>
              </ul>   
              <form>
                <button class="edit-info" data-id="${title}">Edit</button>
                <button class="save-button" data-id="${id}">Save</button>
                <button class="delete-button" data-id="${id}">Delete</button>
              </form>
              <div class="edit-info"></div>
            </div>
              `;

                editMovieForm(movieDisplay);

            });
            activateSave();
            deleteFilm()
        }).catch((error) => {
            console.log(error);
        });


    }
    getMovieInfo();

    function activateSave() {
        $('.save-button').on('click', function (e) {
            e.preventDefault();
            let idMovie = $(this).attr('data-id');
            let movieTitle = $(this).parent().next().children().first().val();
            let ratingMovie = $(this).parent().next().children().first().next().val();
            let movieObj = {
                title: `${movieTitle}`,
                rating: `${ratingMovie}`
            };
            console.log(movieObj);
            fetch(`https://flash-checkered-play.glitch.me/movies/${idMovie}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(movieObj)
                }).then(response => response.json()).then(data => {
                console.log(`Edited movie data JSON: ${data}`);
            }).then(getMovieInfo)

        });
    }

    function editMovieForm(movie) {
        $('#movie-display').html(movie);
        $('#loading').css('display', 'none');
        $('.edit-info').on('click', function (e) {
            e.preventDefault();
            let titleMovie = $(this).attr('data-id');
            console.log(titleMovie);
            $(this).parent().next().html(`<input type="text" value="${titleMovie}" >
                                       <select class="movie-rating">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>`);
        });

    }


    function deleteFilm() {
        $('.delete-button').on('click', function (e) {
            e.preventDefault();
            let idOfMovie = $(this).attr('data-id');
            console.log(idOfMovie);

            const options = {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
            };
            fetch(`https://flash-checkered-play.glitch.me/movies/${idOfMovie}`, options)
                .then(response => response.json())

                .then(getMovieInfo);

        })
    }



    $('#submit-button').on('click', function(e) {
        e.preventDefault();

        renderLoading();

        let title = $('#movie-title').val();
        let rating = $('#movie-rating').val();

        let movieObj = {
            "title": title,
            "rating": rating
        }

        fetch("https://flash-checkered-play.glitch.me/movies", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieObj),
        })
            .then( response => response.json()).then(getMovieInfo)
    })




















});