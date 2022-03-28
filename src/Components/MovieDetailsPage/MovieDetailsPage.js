import {
  useNavigate,
  useParams,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import nextId from "react-id-generator";
import s from "./MovieDetailsPage.module.css";
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));

export default function MovieDetailsPage() {
  let navigate = useNavigate();
  let { movieId } = useParams();
  const [movieById, setMovieById] = useState("");

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=c46479025b6130edc933e316d219208d&language=en-US`
    )
      .then((data) => data.json())
      .then((movie) => {
        console.log(movie);
        setMovieById(movie);
      }).catch(error => alert(error));
  }, [movieId]);

  return (
    <>
      <button
        className={s.button}
        type="button"
        onClick={() => {
          navigate("/");
        }}
      >
        <AiOutlineArrowLeft />
        Go back
      </button>
      {movieById && (
        <>
          <div className={s.wrapper}>
           {movieById.backdrop_path ? <img
              alt={movieById.original_title}
              src={`https://image.tmdb.org/t/p/w300/${movieById.backdrop_path}`}
            /> : <img src="https://i.ibb.co/tZsGfwJ/download.jpg" alt="placeholder"/>}
            <div className={s.textContainer}>
              <h2 className={s.text}> {movieById.title}</h2>
              <p className={s.text}>user score: {movieById.vote_average}</p>
              <h3 className={s.text}>overview</h3>
              <p className={s.text}>{movieById.overview}</p>
              <h3 className={s.text}>Genres</h3>
              <ul>
                {movieById.genres && movieById.genres.map((genre) => (
                  <li key={nextId()} className={s.genre}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={s.wrapperCast}>
            <div className={s.linkWrapper}>
              <h3>Additional information</h3>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${s.active}` : `${s.link}`
                }
                to={`cast`}
              >
                Cast
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${s.active}` : `${s.link}`
                }
                to={`reviews`}
              >
                Reviews
              </NavLink>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
              <Routes>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
              </Routes>
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}
