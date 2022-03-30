import { useParams} from "react-router-dom"
import { useState, useEffect } from "react";
import s from './MovieCast.module.css'
import { fetchMoviesCast } from "../../ApiService.js/ApiService";


export default function MovieCast(){
    const [credits, setCredits] = useState('')
    let{movieId} = useParams();

    

    useEffect(() => {
        fetchMoviesCast(movieId).then(credits =>{
            setCredits(credits);
        }).catch(error => alert(error));


    }, [movieId])

    return(
        <div>
       {credits && credits.cast.length > 0 ? credits.cast.map(credit => { 
           return (<div key={credit.id} className={s.wrapper}>
               {credit.profile_path ? <img src={`https://image.tmdb.org/t/p/w200/${credit.profile_path}`} alt={credit.name}
               /> : <img src="https://i.ibb.co/xJYpGwD/Person.png" alt='placeholder'/>}
               <p>Name: {credit.name}</p>
               <p>Character: {credit.character}</p>
           </div>
            
)}) : <p>Unknown</p>}
    </div>
    )
}
 
