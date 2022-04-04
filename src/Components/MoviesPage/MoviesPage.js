import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notiflix from "notiflix";
import { fetchMoviesSearch } from "../../ApiService.js/ApiService";

export default function MoviesPage() {
  const [value, setValue] = useState("");
  const [movies, setMovies] = useState();
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    if (location.search) {
      fetchMoviesSearch(location.search.split('=')[1])
        .then((movies) => {
          setMovies(movies);
          if (movies && movies.results.length === 0) {
            Notiflix.Notify.failure('No movies matches search query');
          }
        })
        .catch((error) => alert(error));
    }
  }, [location.search]);

  function handleInput(event) {
    setValue(event.target.value);
  }

  function onFormSubmit(event) {
    event.preventDefault();
    setMovies("");
    const trimedValue = value.trim();
    if (!trimedValue) {
      Notiflix.Notify.failure("Enter something");
      return;
    }

    

    fetchMoviesSearch(trimedValue)
      .then((movies) => {
        setMovies(movies);
        if (movies && movies.results.length === 0) {
          Notiflix.Notify.failure("No movies matches search query");
        }
      })
      .catch((error) => alert(error));

    navigate({ ...location, search: `query=${value}` });
  }

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input minLength="2" value={value} onChange={handleInput} />
        <button>Search</button>
      </form>
      <ul>
        {movies &&
          movies.results.map((movie) => {
            return (
              <Link
                key={movie.id}
                to={{
                  pathname: `/movies/${movie.id}`
                }}><li>{movie.title}</li></Link>
            );
          })}
      </ul>
    </div>
  );
}
