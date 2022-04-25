import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../actions";
import styles from './Home.module.css';

export default function SearchBar() {
  const dispatch = useDispatch()
  const [name,setName] = useState('');


  function handleInputChange(e){
     e.preventDefault();
     setName(e.target.value);
     console.log(name);
}

  function handleSubmit(e) {
    e.preventDefault();
   
     dispatch(getNameRecipes(name));
     setName("");
    
}

return (
    <div className={styles.search}>
        <input className={styles.input} type = 'text' placeholder="Buscar Recetas..."onChange={e=> handleInputChange(e)}/>
        
        
        <button className={styles.btnsearch} type= 'submit' onClick={e => handleSubmit(e)}>Buscar</button>
    </div>
)
}