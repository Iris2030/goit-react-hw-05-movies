import {
  useNavigate,
  useLocation,
  useParams,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import nextId from "react-id-generator";
import s from "./MovieDetailsPage.module.css";
import { fetchMovieDetails } from "../../ApiService.js/ApiService";
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));



export default function MovieDetailsPage() {
  const location = useLocation()
  let navigate = useNavigate();
  let { movieId } = useParams();
  const [movieById, setMovieById] = useState("");
console.log(location);


  useEffect(() => {
    fetchMovieDetails(movieId).then((movie) => {
        setMovieById(movie);
      }).catch(error => alert(error));
  }, [movieId]);

  return (

    <>
      <button
        className={s.button}
        type="button"
        onClick={() => {
          navigate(-1);
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
                {movieById.genres.length === 0 && <p>Unknown</p>}
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
