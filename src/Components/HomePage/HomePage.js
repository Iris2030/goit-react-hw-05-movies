import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import s from "./HomePage.module.css";
import { fetchTrendingMovies } from "../../ApiService.js/ApiService";

export default function HomePage() {
  const [trandingMovies, setTrandingMovies] = useState("");
  const location = useLocation();

  useEffect(() => {
    fetchTrendingMovies()
      .then((movies) => {
        setTrandingMovies(movies.results);
      })
      .catch((error) => alert(error));

    return () => setTrandingMovies("");
  }, []);

  return (
    <div className={s.wrapper}>
      <p className={s.header}>Tranding today</p>

      {trandingMovies &&
        trandingMovies.map((movie) => {
          return (
            <ul key={movie.id}>
              <li className={s.item}>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}`,
                    state: { from: location },
                  }}
                >
                  {movie.title}
                </Link>
              </li>
            </ul>
          );
        })}
    </div>
  );
}
