import React from 'react';

import Tier from './Tier';

import styles from './Tiers.module.css';

function Tiers() {

    const tierData = [
        {
            title: 'Beginner Tier',
            subtitle: 'Discover Yourself Before Crypto',
            details: [
                { label: 'Wellbeing Focus', description: 'Emphasize stress management, decision-making, and understanding risk tolerance.' },
                { label: 'Crypto Basics', description: 'Introduce cryptocurrency concepts and its potential.' },
                { label: 'Personalized Path', description: 'Assessments to guide beginners based on their investment style.' }
            ]
        },
        {
            title: 'Intermediate Tier',
            subtitle: 'Deep Dive into Crypto',
            details: [
                { label: 'Crypto Directory', description: 'Detailed guides on popular cryptocurrencies and related tools.' },
                { label: 'Advanced Learning', description: 'In-depth content on blockchain, DeFi, NFTs, and more.' },
                { label: 'Community Engagement', description: 'Forums and boards for shared experiences and learning.' }
            ]
        },
        {
            title: 'Advanced Tier',
            subtitle: 'Master Smart Crypto Investing',
            details: [
                { label: 'Mitigation Platform', description: 'Tools and analytics for optimized crypto investments.' },
                { label: 'Exclusive Content', description: 'Advanced strategies, research, and expert insights.' },
                { label: 'Collaborative Opportunities', description: 'Workshops and sessions for platform enhancement.' }
            ]
        }
    ];

    return (
        <div className={styles.tiers__wrapper}>
            <Tier onOpen={null} title={tierData[0].title} subtitle={tierData[0].subtitle} details={tierData[0].details} />
            <Tier onOpen={null} title={tierData[1].title} subtitle={tierData[1].subtitle} details={tierData[1].details} />
            <Tier onOpen={null} title={tierData[2].title} subtitle={tierData[2].subtitle} details={tierData[2].details} />
        </div>
    );
}

export default Tiers;
