
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import s from './HomePage.module.css'

export default function HomePage() {
  const [trandingMovies, setTrandingMovies] = useState("");
//   const [page, setPage] = useState(1);

useEffect(() => {
 function fetchMovies() {
        return fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=c46479025b6130edc933e316d219208d&page=1`
        )
          .then((response) => {
            return response.json();
          })
          .then((movies) => {
            setTrandingMovies(movies.results);
          }).catch(error => alert(error));
      }

      fetchMovies()

      return(() => setTrandingMovies(''))
}, [])
  
 
  return (
      <div className={s.wrapper}>
  <p className={s.header}>Tranding today</p>

  {trandingMovies && trandingMovies.map(movie => {
     return <ul key={movie.id}>
      <li className={s.item} >
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link></li>

      </ul>
  })}
  </div>
  )
}
