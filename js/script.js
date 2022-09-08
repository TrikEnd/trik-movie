function searchMovie() {
    $('#movie-list').html('');

    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': 'bf848eae',
            's': $('#search-input').val()
        },
        success: function (result) {
            if(result.Response == "True") {
                let movies = result.Search;
                console.log(movies);

                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <img src="`+ data.Poster +`" class="card-img-top" alt="img">
                                <div class="card-body">
                                    <h5 class="card-title">`+ data.Title +`</h5>
                                    <p class="card-text">`+ data.Year +`</p>
                                    <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="`+ data.imdbID +`">See detail</a>

                                </div>
                    </div>
                    </div>
                    `);
                })
                
                $('#search-input').val('');

            } else {
                $('#movie-list').html(`
                    <div class="col">
                        <h1 class="text-center"> ` + result.Error + `</h1>
                    </div>
                `)
            }
        }
    });
}

$('#search-button').on('click', function () {
    searchMovie();

});

$('#search-input').on('keyup', function(event) {
    if(event.keyCode === 13) {
        searchMovie();
    }
});


$('#movie-list').on('click', '.see-detail', function () {
    console.log($(this).data('id'))
});