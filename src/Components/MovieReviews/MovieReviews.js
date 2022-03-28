import { useParams} from "react-router-dom"
import { useState, useEffect } from "react";
import nextId from "react-id-generator";
// import s from './MovieReviews.module.css'


export default function MovieReviews(){
    const [reviews, setReviews] = useState('')
    let{movieId} = useParams();


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=c46479025b6130edc933e316d219208d&language=en-US&page=1`).then(data => data.json())
        .then(reviews =>{
            setReviews(reviews);
        }).catch(error => alert(error));

return(() => setReviews(''))
    }, [movieId])

    return( 
        <>
  {reviews && reviews.results.map(result => {
      return <div key={nextId()}> <h4>{result.author}</h4>
           <p>{result.content}</p>
           </div>
            })}
  {reviews.results !== [] && <p> We don't have any reviews for this movie </p> }  
    </>
    )
}
 