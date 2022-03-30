import { useParams} from "react-router-dom"
import { useState, useEffect } from "react";
import nextId from "react-id-generator";
import { fetchMovieReviews } from "../../ApiService.js/ApiService";
// import s from './MovieReviews.module.css'


export default function MovieReviews(){
    const [reviews, setReviews] = useState('')
    let{movieId} = useParams();


    useEffect(() => {
        fetchMovieReviews(movieId)
        .then(reviews =>{
            setReviews(reviews);
        }).catch(error => alert(error));

return(() => setReviews(''))
    }, [movieId])

    return( 
        <>
  {reviews && reviews.results.length > 0 ? reviews.results.map(result => {
      return <div key={nextId()}> <h4>{result.author}</h4>
           <p>{result.content}</p>
           </div>
            }) : <p> We don't have any reviews for this movie </p>}
    </>
    )
}
 