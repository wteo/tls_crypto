import React from 'react';

import styles from './Tier.module.css';

function Tier() {
    return (
        <div className={styles.tiers__wrapper}>
            <div className={styles.tiers__container}>
                <h3>Beginner Tier</h3>
                <h6>Discover Yourself Before Crypto</h6>
                <ul>
                    <li>Wellbeing Focus: Emphasize stress management, decision-making, and understanding risk tolerance.</li>
                    <li>Wellbeing Focus: Emphasize stress management, decision-making, and understanding risk tolerance.</li>
                    <li>Wellbeing Focus: Emphasize stress management, decision-making, and understanding risk tolerance.</li>
                </ul>
            </div>
            <div className={styles.tiers__container}>
                <h3>Beginner Tier: 'Discover Yourself Before Crypto'</h3>
                <ul>
                    <li>Wellbeing Focus: Emphasize stress management, decision-making, and understanding risk tolerance.</li>
                    <li>Wellbeing Focus: Emphasize stress management, decision-making, and understanding risk tolerance.</li>
                    <li>Wellbeing Focus: Emphasize stress management, decision-making, and understanding risk tolerance.</li>
                </ul>
            </div>
            <div className={styles.tiers__container}>
                <h3>Beginner Tier: 'Discover Yourself Before Crypto'</h3>
                <ul>
                    <li>Wellbeing Focus: Emphasize stress management, decision-making, and understanding risk tolerance.</li>
                    <li>Wellbeing Focus: Emphasize stress management, decision-making, and understanding risk tolerance.</li>
                    <li>Wellbeing Focus: Emphasize stress management, decision-making, and understanding risk tolerance.</li>
                </ul>
            </div>
        </div>
    );
}

export default Tier;
