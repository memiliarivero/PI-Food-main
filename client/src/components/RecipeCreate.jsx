import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postRecipes, getTypeDiets} from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import styles from './RecipeCreate.module.css';

function validateForm (input){
    let errors = {};
    if(!input.title ) errors.title= 'Debe ingresar el nombre de la Receta'
       
    if(!input.summary) errors.summary= 'Debe ingresar el resumen de la Receta'
    if(!input.spoonacularScore<0 || input.spoonacularScore>100) errors.spoonacularScore= 'El puntaje asignado debe estar entre 0 y 100'
    if(!input.healthScore<0 || input.healthScore>100) errors.healthScore= 'El puntaje asignado debe estar entre 0 y 100'
    
    if(!input.analyzedInstructions) errors.analyzedInstructions= 'Debe ingresar los pasos de la Receta'
    return errors
}


export default function RecipeCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const listDiets = useSelector((state)=> state.typeDiets)
    console.log(listDiets)
    const [errors, setErrors] = useState({})


    useEffect(() => {
        dispatch(getTypeDiets())
        },[dispatch]);

    const [input,setInput] = useState({
        title :'',
        summary:'',
        spoonacularScore:'',
        healthScore:'',
        analyzedInstructions:'',
        typeDiets:[] //lo seteo en un array para q me permita cargar mas de uno sino solo permite uno
    })
    
     
   function handleChange(e) {
       setInput({
           ...input,
           [e.target.name] : e.target.value // el name es lo q describe al input o sea al target en el que este en ese momento y el value es lo que yo ingreso.
       })
       setErrors(validateForm({
           ...input,
           [e.target.name]: e.target.value,
       }))
       console.log (input)
   }



   function handleSelect(e){
    setInput({
        ...input,
        typeDiets:[...input.typeDiets, e.target.value]//traeme lo q tenia y concatenale lo q agregue
    })
}
  
   function handleSubmit(e){
    if(input.title && input.summary && input.spoonacularScore && input.healthScore && input.analyzedInstructions && input.typeDiets.length>0){

       e.preventDefault();
       console.log(input)
       dispatch(postRecipes(input))
       alert("Su receta fue creada!!")
       setInput({
        title :'',
        summary:'',
        spoonacularScore:'',
        healthScore:'',
        analyzedInstructions:'',
        typeDiets:[],
    });
    history.push('/home')
} else{
    e.preventDefault();
    alert("Debe completar el formulario!!")
  }
}
   
   function handleDelete(e){
       setInput({
           ...input,
           typeDiets: input.typeDiets.filter(diet => diet !== e)// filtramelo por todo lo que no sea ese elemeto 
       })

   }

 


    return(
        <div className={styles.bkg}>
        <Link to='/home'><button className={styles.btn}>Volver</button></Link>
        <h1 className={styles.h1}>Crea tu Receta!</h1>
        <form onSubmit={(e)=>handleSubmit(e)} className={styles.form}>
            <div>
                <label>Nombre:</label>
                <input
                 type='text'
                 name='title'
                 value={input.title}
                 onChange={(e)=>handleChange(e)}
                />
                 { errors.title && (
                    <p className={styles.error}>{errors.title}</p>
                ) }
            </div>
            <div>
                <label>Resumen:</label>
                <input
                   type='text'
                   name='summary'
                   value={input.summary}
                   onChange={(e)=>handleChange(e)}
                />
                { errors.summary && (
                    <p className={styles.error}>{errors.summary}</p>
                ) }
            </div>
            <div>
                <label>Puntuacion:</label>
                <input
                type='number'
                name='spoonacularScore'
                value={input.spoonacularScore}
                onChange={(e)=>handleChange(e)}
                />
                { errors.spoonacularScore && (
                    <p className={styles.error}>{errors.spoonacularScore}</p>
                ) }
            </div>
            <div>
                <label>Puntaje Saludable</label>
                <input
                 type='number'
               
                 name='healthScore'
                 value={input.healthScore}
                 onChange={(e)=>handleChange(e)}
                
                />
                { errors.healthScore && (
                    <p className={styles.error}>{errors.healthScore}</p>
                ) }
            </div>
            <div>
                <label>Paso a Paso</label>
                <input
                    type='text'
                    name='analyzedInstructions'
                    value={input.analyzedInstructions}
                    onChange={(e)=>handleChange(e)}
                />
                 { errors.analyzedInstructions && (
                    <p>{errors.analyzedInstructions}</p>
                ) }
            </div>
            <select onChange={(e) => handleSelect(e)} className={styles.select}>
                <option>Selecciona el tipo de Dieta</option>
                {listDiets?.map((d) => (
                    <option key={d.name} value={d.name}>
                   {d.name}
                    </option>
                ))}
            </select>
            <ul><li>{input.typeDiets.map(e =>e + ", ")}</li></ul>
            <button type='submit' className={styles.correct}>Crear Receta</button>
        </form>
        {input.typeDiets.map(e => {
            return(
           <div >
                <p className={styles.types}>{e}</p>
                <button className={styles.btnx} onClick={() => handleDelete(e)}>X</button>
               
            </div>
        )})}
    </div>
)


}