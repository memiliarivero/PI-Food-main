/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes,filterRecipesByTypeDiet, filterRecipesByCreated, orderByName,orderByPuntuation} from "../actions";
import { Link } from 'react-router-dom';
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from './Home.module.css';

export default function Home () {

    const dispatch = useDispatch(); //utilizo para ir despachando mis acciones.lo mismo que(mapStateToProps)
    const allRecipes = useSelector((state) => state.recipes);
    const [orden,setOrden] =useState('')
    const [currentPage,setCurrentPage] = useState(1); // pagina inicial arranca en 1
    const [recipesPerPage,setRecipesPerPage] = useState(9);//cuantas recetas por pagina
    const indexOfLastRecipe = currentPage * recipesPerPage; // índice de la última receta = página actual * recetas por página
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //índice de la primera receta = índice de la última receta - recetas por página
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe) //agarra el arreglo y toma una porcion dependiendo de lo que le paso por parametro


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect (() => {
        dispatch(getRecipes());// es lo mismo q el mapDispatchToProps
    
    }, [dispatch]); 
    

function handleClick(e) {
    e.preventDefault(); // para q no se recargue y se rompa porque con use Effect vuelven a cargarse los estados de redux
    dispatch(getRecipes()); ///*  reset a todas las recetas  */
} 

 function handleFilterTypeDiet(e) {
    dispatch(filterRecipesByTypeDiet(e.target.value))//accedo a cada accion por su valor dependiendo de cual clickea el usuario
    setOrden(`ordenado ${e.target.value}`);
    setCurrentPage(1);
}

function handleFilterCreated(e){
    dispatch(filterRecipesByCreated (e.target.value))
    setOrden(`ordenado ${e.target.value}`);
    setCurrentPage(1);
}


function handlePuntuation(e) {
    e.preventDefault();
    dispatch(orderByPuntuation(e.target.value));
    setOrden(`ordenado ${e.target.value}`);
    setCurrentPage(1);
    
}


function handleSort (e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1); // seteo la pagina en la primera q comience en la numero 1
    setOrden(`ordenado ${e.target.value}`)//modifica el estado local para q desde el front haga el ordenamiento lo setea ordenado para q haga la modificacion en el renderizado

}
 
return(

    <div className={styles.bkg}>
        <Link to= '/recipe'><button className={styles.create}>'Crear Receta'</button></Link>
       
        {/* <SearchBar/> */}
        <button onClick= {e => {handleClick(e)}} className={styles.refresh}>
             Volver a cargar todas las recetas
        </button>
        <div className={styles.filt}>
            <select onChange={e => handleSort(e)} className={styles.select}>
                <option value = 'asc'>Ascendente</option>
                <option value = 'desc'>Descendente</option>
            </select>
            <select onChange={e => handlePuntuation(e)}className={styles.select}>  
                <option value="All">All</option> 
                <option value="Desc">Lowest Score</option>
                <option value="Asc">Highest Score</option>
             </select>           
            <select onChange={e => handleFilterTypeDiet(e)}className={styles.select}>   
                <option value="All">All Diets</option>
                <option value="gluten free">Gluten Free</option>
                <option value="dairy free">Dairy Free</option>
                <option value="vegan">Vegan</option>
                <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                <option value="fodmap friendly">Formap Friendly</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="paleolithic">Paleolithic</option>
                <option value="primal">Primal</option>
                <option value="whole 30">Whole 30</option>
            </select>
            <select onChange={e => handleFilterCreated(e)}className={styles.select}>
                <option value="All">All Recipes</option>
                <option value="created">Recipe Created</option>
                <option value="api">Api Recipes</option>
            </select>
            <SearchBar/>
            <div className={styles.paginado}>
            <Paginado
            recipesPerPage = {recipesPerPage}
            allRecipes = {allRecipes.length}
            paginado = {paginado}
            />
            </div>
            
            <div className={styles.cards}>

                
          {allRecipes.length>0? currentRecipes?.map((el) => {
                return (
                    <div key={el.id}>     
                    <Link to={"/recipes/" + el.id} className= {styles.cards}>
                        <Card title={el.title} img={el.img} typeDiets={el.typeDiets} />
                    </Link>
                    </div>  
                    
                )
                
        }) : <h1>Loading...</h1>}
          </div>
           
        </div>


     </div>
    )

}