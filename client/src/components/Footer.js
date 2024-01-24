import React from 'react';

import pininterest from '../icons/pininterest.png';
import facebook from '../icons/facebook.png';
import youtube from '../icons/youtube.png';
import lenster from '../icons/lenster.png'

import styles from './Footer.module.scss';

const socialMediaArr = [{
    name: 'Pinterest',
    link: 'https://pinterest.thelazysociety.com',
    imageLink: pininterest,
}, {
    name: 'Facebook',
    link: 'https://facebook.thelazysociety.com',
    imageLink: facebook,
}, {
    name: 'Youtube',
    link: 'https://www.youtube.com/@tlsmastermind',
    imageLink: youtube,
}, {
    name: 'Lenster',
    link: 'https://lenster.thelazysociety.com',
    imageLink: lenster,
}];

function Footer() {
    return (
        <footer className={styles.footer}>
            <h1>Join & Follow the Community</h1>
            <a href='https://discord.thelazysociety.com' rel='noreferrer' target='_blank'><button>Discord</button></a>
            <h3>Follow Us</h3>
            <div className={styles.social__grid}>
                { socialMediaArr.map((item, index) => (
                    <a key={index} href={item.link} rel='noreferrer' target='_blank'>
                        <div className={styles.social__container}>
                            <img className={styles.social__image} src={item.imageLink} alt={`${item.name} Icon`} />
                        </div>
                    </a>
                    )) 
                }
            </div>
            <p>© 2024 The Lazy Society |  All rights reserved</p>
        </footer>
    );
}

export default Footer;
