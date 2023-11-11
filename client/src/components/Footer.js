import React from 'react';

import pininterest from '../icons/pininterest.png';
import facebook from '../icons/facebook.png';
import youtube from '../icons/youtube.png';

import styles from './Footer.module.css';

const socialMediaArr = [{
    name: 'Pinterest',
    link: 'https://www.pinterest.com.au/thelazysociety/',
    imageLink: pininterest,
}, {
    name: 'Facebook',
    link: 'https://www.facebook.com/thelazysociety',
    imageLink: facebook,
}, {
    name: 'Youtube',
    link: 'https://www.youtube.com/@thelazysociety9795',
    imageLink: youtube,
}];

function Footer() {
    return (
        <footer className={styles.footer}>
            <h1>Join & Follow the Community</h1>
            <a href='https://discord.com/invite/2QmtZ4dzDw' rel='noreferrer' target='_blank'><button>Discord</button></a>
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
            <p>© 2023 The Lazy Society |  All rights reserved</p>
        </footer>
    );
}

export default Footer;
