import React from 'react';

import styles from './Tiers.module.css';

function Tier({ onOpen, title, subtitle, details }) {
    return (
    <div className={styles.tiers__container} onClick={onOpen}>
        <h3>{title}</h3>
        <h6>{subtitle}</h6>
        <ul className={styles.list__grid}>
            {details.map((detail, index) => (
                <li key={index}>
                    <div className={styles.image__container}>
                        <img className={styles.service__image} src={detail.imageLink || ''} alt={detail.imageDescription || ''}/>
                    </div>
                    <p className={styles.service__label}><strong>{detail.label}: </strong>{detail.description}</p>
                    <button className={styles.service__button}>Learn More</button>
                </li>
            ))}
        </ul>
    </div>)
};


export default Tier;
