

//Get movie data
const getMovies = function() {
    return fetch('https://flash-checkered-play.glitch.me/movies')
        .then(response => response.json());
}


const tmdbGet = function(search) {

    let searchValue = search;

    if (search.indexOf(" ") !== -1) {
        searchValue = search.split(" ").join("+")
    }
    return fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_TOKEN}&query=${searchValue}`).then(response => response.json()).then(results => {return results.results[0].poster_path});
}

getMovies().then((movies) => {
    movies.forEach((movie) => {
        tmdbGet(movie.title).then(result => console.log(result))
    })
})



$(document).ready( () => {



    //Render the loading thing
    function renderLoading() {
        $('#movie-display').html('<p id="loading" class="text-center"><span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span><span>.</span><span>.</span><span>.</span></p>')
    }




    function activateSave() {
        $('.save-button').on('click', function (e) {
            e.preventDefault();
            let idMovie = $(this).attr('data-id');
            let movieTitle = $(this).parent().next().children().first().val();
            let ratingMovie = $(this).parent().next().children().first().next().val();
            let posterLink = $(this).parent().next().children().first().next().next().val();
            let movieObj = {
                title: `${movieTitle}`,
                rating: `${ratingMovie}`,
                poster: `${posterLink}`
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
            let checker = $(this).parent().next().html();
            if (checker === "") {
                $(this).parent().next().html(`<input type="text" value="${titleMovie}" placeholder="Enter title" >
                                        
                                       <select class="movie-rating">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        
                                        
`
                );
            } else {
                $(this).parent().next().html("");
            }
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



    function getMovieInfo() {

        renderLoading();
        getMovies().then((movies) => {

            console.log(movies);

            let movieDisplay = ``;

            let imageSource = "img/baby-yoda.jpg"

            movies.forEach(({title, rating, id}) => {

                console.log(`ID: ${id}, Title: ${title}, Rating: ${rating}`);

                movieDisplay += `
            <div class="text-center" style="color: midnightblue">
               <ul style="margin-right: 3em">
                <li class="d-none">ID: ${id}</li>
                <li>Title: ${title}</li>
                <li>Rating: ${rating}/5</li>
              </ul>  
              <img src=${imageSource}> 
              <form>
                <button class="edit-info" data-id="${title}">Edit</button>
                <button class="save-button" data-id="${id}">Save</button>
                <button class="delete-button" data-id="${id}">Delete</button>
              </form>
              <div></div>
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

});