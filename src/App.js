import {Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
import Navigation from './Navigation/Navigation';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';
const HomePage = lazy(() => import('./Components/HomePage/HomePage'))
const MoviesPage = lazy(() => import('./Components/MoviesPage/MoviesPage'))
const MovieDetailsPage = lazy(() => import('./Components/MovieDetailsPage/MovieDetailsPage'))


function App() {
  return (
    <div className="App">
  <Navigation/>
<Suspense fallback={<p>Loading...</p>}>
  <Routes>
  <Route path='/' element={<HomePage/>} />
  <Route path='/movies' element={<MoviesPage/>} />
  <Route path='*' element={<NotFoundPage/>}/>
  <Route path='/movies/:movieId/*' element={<MovieDetailsPage/>}/>
  </Routes>
  </Suspense>
    </div>
  );
}

export default App;
