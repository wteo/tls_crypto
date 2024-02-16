import React from 'react';

import { Link } from 'react-scroll';

import Tier from './Tier';

// images
import mastermind from '../images/mindset.png'
import richBookCover from '../images/rich_book_cover.jpg';
import meetup from '../images/meetup.png';
import blog from '../images/blog.jpg';
import wiki from '../images/wiki.png';
import farmbase from '../images/farmbase.png';


import styles from './Tiers.module.scss';

function Tiers() {

    const tierData = [
        {
            title: 'Beginner Tier',
            subtitle: 'Discover Yourself Before Crypto',
            details: [
                { 
                    imageLink: mastermind,
                    link: 'https://mastermind.thelazysociety.com',
                    imageDescription: 'The 7 Steps to Riches book cover',
                    label: 'Mindset Mastery', 
                    description: 'Explore our courses and content designed to equip you with the mindset needed for achieving financial independence.' 
                }, { 
                    imageLink: richBookCover,
                    link: 'https://www.amazon.com.au/dp/B0CJD8SKHB',
                    imageDescription: 'The 7 Steps to Riches book cover',
                    label: 'Read our Mindset Book', 
                    description: 'The "7 Steps to Riches" by our mindset guru Alex Holland. Learn how mental preparation is key to achieving wealth.' 
                }, { 
                    imageLink: meetup,
                    link: 'https://www.meetup.com/tls-aus/',
                    imageDescription: 'A group of like-minded people gathering to talk about crypto.',
                    label: 'Join Our Crypto Meetup', 
                    description: 'Connect & learn with others weekly in our engaging online community.' 
                },
            ]
        },
        {
            title: 'Intermediate Tier',
            subtitle: 'Deep Dive into Crypto',
            details: [
                { 
                    imageLink: blog,
                    link: 'https://thelazysociety.com',
                    imageDescription: 'A solo crypto ethusiast browsing a blog.',
                    label: 'The Lazy Society Blog', 
                    description: 'Your guide to navigating cryptocurrency with the latest news and airdrops' 
                },
                { 
                    imageLink: wiki,
                    link: 'https://wiki.thelazysociety.com',
                    imageDescription: 'A digital encyclopedia on cryptocurrencies.',
                    label: 'Dive into our Crypto Index', 
                    description: 'Read through a selection of our favourite cryptocurrencies with informative links for deeper insights.' 
                }, {
                    imageLink: farmbase,
                    link: 'https://www.farmbase.pro/?ref=54b04da1-1dcb-4a90-9894-f8dca79909a4',
                    imageDescription: 'Farmbase Bot Logo',
                    label: 'Stop the Airdrop Chase', 
                    description: 'Automate Your Rewards with Farmbase Farming Bot!'
                },
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
            { // <Tier onOpen={null} title={tierData[2].title} subtitle={tierData[2].subtitle} details={tierData[2].details} /> 
            }
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
