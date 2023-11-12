import React from 'react';

import { Link } from 'react-scroll';

import Tier from './Tier';

// images
import tlsBlog from '../images/tls_blog.jpeg';


import styles from './Tiers.module.scss';

function Tiers() {

    const tierData = [
        {
            title: 'Beginner Tier',
            subtitle: 'Discover Yourself Before Crypto',
            details: [
                { 
                    imageLink: 'https://picsum.photos/400/500',
                    link: '',
                    imageDescription: 'Placeholder Image',
                    label: 'Wellbeing Focus', 
                    description: 'Emphasize stress management, decision-making, and understanding risk tolerance.' },
                { 
                    imageLink: 'https://picsum.photos/400/501',
                    link: '',
                    imageDescription: 'Placeholder Image',
                    label: 'Crypto Basics', 
                    description: 'Introduce cryptocurrency concepts and its potential.' },
                { 
                    imageLink: 'https://picsum.photos/400/502',
                    link: '',
                    imageDescription: 'Placeholder Image',
                    label: 'Personalized Path', 
                    description: 'Assessments to guide beginners based on their investment style.' 
                }
            ]
        },
        {
            title: 'Intermediate Tier',
            subtitle: 'Deep Dive into Crypto',
            details: [
                { 
                    imageLink: tlsBlog,
                    link: 'https://thelazysociety.com',
                    imageDescription: 'Placeholder Image',
                    label: 'The Lazy Society Blog', 
                    description: 'Your guide to navigating cryptocurrency with the latest news and airdrops' 
                },
                { 
                    imageLink: 'https://picsum.photos/400/504',
                    link: '',
                    imageDescription: 'Placeholder Image',
                    label: 'Advanced Learning', 
                    description: 'In-depth content on blockchain, DeFi, NFTs, and more.' 
                },
                {   
                    imageLink: 'https://picsum.photos/400/505',
                    link: '',
                    imageDescription: 'Placeholder Logo',
                    label: 'Dive into Our Crypto Community on Discord', 
                    description: 'Engage in vibrant discussions on all things cryptocurrency. Stay updated with the latest news, airdrops, and insider tips.' 
                }
            ]
        },
        {
            title: 'Advanced Tier',
            subtitle: 'Master Smart Crypto Investing',
            details: [
                { 
                    imageLink: 'https://picsum.photos/400/506',
                    link: '',
                    imageDescription: 'Placeholder Image',
                    label: 'Mitigation Platform', 
                    description: 'Tools and analytics for optimized crypto investments.' 
                },
                { 
                    imageLink: 'https://picsum.photos/400/507',
                    link: '',
                    imageDescription: 'Placeholder Image',
                    label: 'Exclusive Content', 
                    description: 'Advanced strategies, research, and expert insights.' 
                },
                { 
                    imageLink: 'https://picsum.photos/400/508',
                    link: '',
                    imageDescription: 'Placeholder Image',
                    label: 'Collaborative Opportunities', 
                    description: 'Workshops and sessions for platform enhancement.' 
                }
            ]
        }
    ];

    return (
        <section className={styles.tiers__wrapper} id='tier'>
            <h1>Your Crypto Journey: Choose your Path</h1>
            <br/>
            <Tier onOpen={null} title={tierData[0].title} subtitle={tierData[0].subtitle} details={tierData[0].details} />
            <Tier onOpen={null} title={tierData[1].title} subtitle={tierData[1].subtitle} details={tierData[1].details} />
            <Tier onOpen={null} title={tierData[2].title} subtitle={tierData[2].subtitle} details={tierData[2].details} />
            <div className={styles.tiers__quickstart}>
                <h2>Feeling Overwhelmed by Choices?</h2>
                <p>Don't worry, we've got you covered. Dive right in with our Crypto Bull Run checklist!</p>
                <Link to='checklist' spy={true} smooth={true} offset={-40} duration={250}>
                    <h1>{String.fromCharCode(62)}</h1>
                </Link>
            </div>
        </section>
    );
}

export default Tiers;
