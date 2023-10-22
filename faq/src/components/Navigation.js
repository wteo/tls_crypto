import React, { useState, useEffect } from 'react';

import styles from './Navigation.module.css';

function Navigation() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    }

    return (
        <header>
            <button className={styles.nav__hamburger} onClick={toggleMenu}>
                { isMenuOpen ? 'X' : '≡' }
            </button>
            <div className={styles.nav__top__bar}>
                <div className={styles.nav__icon__image__mobile}>
                    <a href="/">
                        <img className={styles.nav__icon__image} src="https://i0.wp.com/thelazysociety.com/wp-content/uploads/2020/02/The-Lazy-Society-logo.png?fit=220%2C194&ssl=1" alt="TLS Logo"/>
                        </a>
                </div>
            </div>
            <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                <ul className={styles.nav__menu}>
                    <li className={styles.nav__icon__wrapper}>
                        <a href="/">
                            <img className={styles.nav__icon__image} src="https://i0.wp.com/thelazysociety.com/wp-content/uploads/2020/02/The-Lazy-Society-logo.png?fit=220%2C194&ssl=1" alt="TLS Logo"/>
                        </a>
                    </li>
                    <li className={styles.nav__menu__title} onClick={toggleMenu}>About Us</li>
                    <li className={styles.nav__menu__title} onClick={toggleMenu}>The Team</li>
                    <li className={styles.nav__menu__title} onClick={toggleMenu}>FAQ</li>
                </ul>
            </nav>
            <div 
                onClick={toggleMenu} 
                className={styles.nav__overlay} 
                style={{ display: isMenuOpen ? 'block' : 'none' }} 
            />
      </header>
    );
}

export default Navigation;
