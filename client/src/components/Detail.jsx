/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, resetDetail} from "../actions/index";
import { useEffect } from "react";
import { useParams } from "react-router";
import styles from "./Detail.module.css";



export default function Detail (props) {
    const dispatch = useDispatch()
    const {id} = useParams()
    const detail = useSelector ((state) => state.detail)   
        
useEffect (() => {dispatch(getDetail(id))
    return dispatch(resetDetail());
},[dispatch,id]);




return (
    <div>
        {
          detail.length > 0 ?
          <div className={styles.dt}>
              <h1 className={styles.title}>{detail[0].title} </h1>   
              <img className={styles.imga} src= {detail[0].img ? detail[0].img : 'https://i.pinimg.com/564x/55/48/d0/5548d0350b9a9bb6a4668b5d585e5337.jpg'} alt= "imagen"/> 
              <h3 className={styles.type}>Tipo de Dieta: {detail[0].typeDiets.map(t => t.name)}</h3>
              <h4 className={styles.type}>Tipo de Plato: {detail[0].dishTypes ? detail[0].dishTypes.map(d => d.name) :'Tipo de Plato no encontrado'}</h4>
              <h5 className={styles.type}>Resumen: {detail[0].summary.replace(/<[^>]*>?/g, "")}</h5>
              <h5 className={styles.type}>Nivel comida Saludable: {detail[0].healthScore}</h5>
              <h5 className={styles.type}>Puntuacion: {detail[0].spoonacularScore}</h5>

              <h5 className={styles.type}>Paso a Paso:{ detail[0].analyzedInstructions}</h5>
               
              <Link to= '/home'><button className={styles.btn}>Volver</button></Link>
            </div> : <h1>Loading...</h1>
          
        }
    </div>
)
}
