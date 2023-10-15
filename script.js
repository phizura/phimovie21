$('.search-button').on('click', function() {
    
    $.ajax({
      url: "http://www.omdbapi.com/?apikey=ab1a398b&s=" + $('.input-keyword').val(),
      success: (results) => {
        const movies = results.Search;
        let cards = "";
        movies.forEach((e) => {
          cards += createCards(e);
        });
        $(".Movie-container").html(cards);
    
        // Ketika button di klik
        $(".modal-detail-button").on("click", function () {
          console.log($(this).data("imdbid"));
          $.ajax({
            url:
              "http://www.omdbapi.com/?apikey=ab1a398b&i=" + $(this).data("imdbid"),
            success: (d) => {
              const detailMovies = showDetail(d);
              $(".modal-body").html(detailMovies);
            },
            error: (s) => {
              console.log(s.responseText);
            },
          });
        });
      },
      error: (s) => {
        console.log(s.responseText);
      },
    });
})




function createCards(e) {
  return ` <div class="col-md-4 my-3">
    <div class="card">
      <img src="${e.Poster}" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">${e.Title}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${e.Year}</h6>
        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${e.imdbID}">Show Details</a>
      </div>
    </div>
  </div>`;
}

function showDetail(d) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img src="${d.Poster}" class="img-fluid" />
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item"><h4>${d.Title}</h4></li>
                  <li class="list-group-item">
                    <strong>Director : </strong>${d.Director}
                  </li>
                  <li class="list-group-item">
                    <strong>Tayang : </strong>${d.Released}
                  </li>
                  <li class="list-group-item">
                    <strong>Genre : </strong>${d.Genre}
                  </li>
                  <li class="list-group-item">
                    <strong>Bahasa : </strong>${d.Language}
                  </li>
                  <li class="list-group-item">
                    <strong>Plot : </strong> <br>
                    ${d.Plot}
                  </li>
                </ul>
              </div>
            </div>
          </div>`;
}
