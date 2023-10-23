import React from 'react';

import styles from './Tiers.module.css';

function Tier({ title, subtitle, details }) {
    return (
    <div className={styles.tiers__container}>
        <h3>{title}</h3>
        <h6>{subtitle}</h6>
        <ul>
            {details.map((detail, index) => (
                <li key={index}><strong>{detail.label}:</strong> {detail.description}</li>
            ))}
        </ul>
    </div>)
};


export default Tier;
