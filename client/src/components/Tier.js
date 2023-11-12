import React from 'react';

import styles from './Tiers.module.scss';

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
                    <a href={detail.link || ''} rel='noreferrer' target='_blank'>
                        <button className={styles.service__button}>Learn More
                        </button>
                    </a>
                </li>
            ))}
        </ul>
    </div>)
};


export default Tier;
