import React from "react";
import styles from './Card.module.css';

export default function Card ({title, img, typeDiets, id}){
    return(
        <div key= {id} className= {styles.card}>
            <div className={styles.cd}>
            <h3>{title}</h3>
            
            <img className={styles.cardimg}src={img ? img: 'https://i.pinimg.com/564x/55/48/d0/5548d0350b9a9bb6a4668b5d585e5337.jpg'} alt="img not found" width="200px" height="250px" />
            <div className={styles.tipes}> {typeDiets.map(t => <h5 key={t.name}>{t.name}</h5>)} </div> 
            </div>
        </div>
    )
}

