


  const  BASIC_URL = "https://api.themoviedb.org";
  const KEY = "c46479025b6130edc933e316d219208d";


  export function fetchTrendingMovies() {
    return fetch(
      `${BASIC_URL}/3/trending/movie/day?api_key=${KEY}&page=1`
    )
      .then((response) => {
        return response.json();
      })
  }

  export function fetchMoviesSearch(value) {
    return fetch(
      `${BASIC_URL}/3/search/movie?api_key=${KEY}&query=${value}&language=en-US&page=1`
    )
      .then((response) => {
        return response.json();
      })
  }

  export function fetchMoviesCast(id) {
    return fetch(
      `${BASIC_URL}/3/movie/${id}/credits?api_key=${KEY}&language=en-US`
    )
      .then((response) => {
        return response.json();
      })
  }

  export function fetchMovieDetails(id) {
    return fetch(
      `${BASIC_URL}/3/movie/${id}?api_key=${KEY}&language=en-US`
    )
      .then((response) => {
        return response.json();
      })
  }

  export function fetchMovieReviews(id) {
    return fetch(
      `${BASIC_URL}/3/movie/${id}/reviews?api_key=${KEY}&language=en-US&page=1`
    )
      .then((response) => {
        return response.json();
      })
  }