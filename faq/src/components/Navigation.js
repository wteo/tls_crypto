import React from 'react';

import styles from './Navigation.module.css';

function Navigation() {

    return (
        <header>
            <button className={styles.nav__hamburger}>
                &#9776;
            </button>
        <nav className={styles.nav}>
            <ul className={styles.nav__menu}>
                <li className={styles.nav__icon__wrapper}>
                    <a href="/">
                        <img className={styles.nav__icon__image} src="https://i0.wp.com/thelazysociety.com/wp-content/uploads/2020/02/The-Lazy-Society-logo.png?fit=220%2C194&ssl=1" alt="TLS Logo"/>
                    </a>
                </li>
                <li className={styles.nav__menu__title}>About Us</li>
                <li className={styles.nav__menu__title}>The Team</li>
                <li className={styles.nav__menu__title}>FAQ</li>
            </ul>
        </nav>
      </header>
    );
}

export default Navigation;
