import React from "react"
import { NavLink } from "react-router-dom"
import s from './Navigation.module.css'

export default function Navigation(){
   
return(
    <nav className={s.navigation}>
<NavLink  className={({isActive}) => (isActive? `${s.active}` : `${s.link}`)} to="/" >home</NavLink>
<NavLink  className={({isActive}) => (isActive? `${s.active}` : `${s.link}`)} to="/movies" >movies</NavLink>
 
</nav>
)
}