import React from 'react';

import styles from './Tiers.module.css';

function Tiers() {
    return (
        <div className={styles.tiers__wrapper}>
            <div className={styles.tiers__container}>
                <h3>Beginner Tier</h3>
                <h6>Discover Yourself Before Crypto</h6>
                <ul>
                    <li><strong>Wellbeing Focus:</strong> Emphasize stress management, decision-making, and understanding risk tolerance.</li>
                    <li><strong>Crypto Basics:</strong> Introduce cryptocurrency concepts and its potential.</li>
                    <li><strong>Personalized Path:</strong> Assessments to guide beginners based on their investment style.</li>
                </ul>
            </div>
            <div className={styles.tiers__container}>
                <h3>Intermediate Tier</h3>
                <h6>Deep Dive into Crypto</h6>
                <ul>
                    <li><strong>Crypto Directory:</strong> Detailed guides on popular cryptocurrencies and related tools.</li>
                    <li><strong>Advanced Learning:</strong> In-depth content on blockchain, DeFi, NFTs, and more.</li>
                    <li><strong>Community Engagement:</strong> Forums and boards for shared experiences and learning.</li>
                </ul>
            </div>
            <div className={styles.tiers__container}>
                <h3>Advanced Tier</h3>
                <h6>Master Smart Crypto Investing</h6>
                <ul>
                    <li><strong>Mitigation Platform:</strong> Tools and analytics for optimized crypto investments.</li>
                    <li><strong>Exclusive Content:</strong> Exclusive Content: Advanced strategies, research, and expert insights.</li>
                    <li><strong>Collaborative Opportunities:</strong> Workshops and sessions for platform enhancement.</li>
                </ul>
            </div>
        </div>
    );
}

export default Tiers;
