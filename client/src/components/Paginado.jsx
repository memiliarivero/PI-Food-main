/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from './Paginado.module.css';


export default function Paginado ({ recipesPerPage, allRecipes, paginado }){
    const pageNumbers= []

    for (let i = 0; i < Math.ceil(allRecipes/recipesPerPage); i++) {
         pageNumbers.push(i+1);
    }

    return(
        
        <nav>
            <ul className= {styles.ul}>
             { pageNumbers?.map(number => (
                    <li key={number}className='number'>

                        <a className= {styles.container} onClick={() => paginado(number)}>{number}</a>

                    </li>
                ))}
              </ul>                
        </nav>
        
    )
        
}