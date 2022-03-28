import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";


export default function MoviesPage() {
  const [value, setValue] = useState("");
  const [movies, setMovies] = useState("");
  const location = useLocation();
  const navigate = useNavigate();


  function handleInput(event) {
    setValue(event.target.value);
  }

  function onFormSubmit(event) {
    event.preventDefault();
    setMovies('')
    const trimedValue = value.trim()
    if(!trimedValue){
    alert('enter something')
    return
    }

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=c46479025b6130edc933e316d219208d&query=${trimedValue}&language=en-US&page=1`
    )
      .then((response) => {
        return response.json();
      })
      .then((movies) => {
        setMovies(movies);
      }).catch(error => alert(error));

    navigate({ ...location, search: `query=${value}` }); 
  }


 
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input  minLength="2" value={value} onChange={handleInput} />
        <button>Search</button>
      </form>
      <ul>
        {movies &&  movies.results.map((movie) => {
        //   return  console.log(movie);
        return <Link key={movie.id} to={`/movies/${movie.id}`}> <li >{movie.title}</li></Link>
    })
         }
         {/* {movies.results === [] && <p>No movies matches search query</p>} */}
      </ul>
    </div>
  );
}
