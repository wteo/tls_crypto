import React, { useState, useEffect } from 'react';
import styles from './Navigation.module.css';

function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [hideNav, setHideNav] = useState(false);
    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const viewportHeight = window.innerHeight;
            const threshold = 0.40 * viewportHeight;
            setHideNav(currentScrollTop > threshold); // Set the hideNav state based on the scroll position and threshold

        };

        // Add the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup: Remove the scroll event listener when the component is unmounted
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const Logo = () => (
        <a href="/">
            <img className={styles.nav__icon__image} src="https://i0.wp.com/thelazysociety.com/wp-content/uploads/2020/02/The-Lazy-Society-logo.png?fit=220%2C194&ssl=1" alt="TLS Logo" />
        </a>
    );

    const MenuItems = () => (
        <>
            <li className={styles.nav__menu__title} onClick={toggleMenu}>About Us</li>
            <li className={styles.nav__menu__title} onClick={toggleMenu}>The Team</li>
            <li className={styles.nav__menu__title} onClick={toggleMenu}>FAQ</li>
        </>
    );

    return (
        <header>
            {/* Desktop Navigation */}
            <nav className={`${styles.nav} ${hideNav ? styles.hidden : ''}`}>
                <ul className={styles.nav__menu}>
                    <li className={styles.nav__icon__wrapper}><Logo /></li>
                    <MenuItems />
                </ul>
            </nav>

            {/* Mobile Navigation */}
            <button className={styles.nav__hamburger} onClick={toggleMenu}>
                {isMenuOpen ? 'X' : '≡'}
            </button>
            <div className={`${styles.nav__top__bar} ${hideNav ? styles.hidden : ''}`}>
                <div className={styles.nav__icon__image__mobile}><Logo /></div>
            </div>
            <ul className={`${styles.nav__menu__mobile} ${isMenuOpen ? styles.navOpen : ''}`}>
                <MenuItems />
            </ul>
            <div onClick={toggleMenu} className={styles.nav__overlay} style={{ display: isMenuOpen ? 'block' : 'none' }} />
        </header>
    );
}

export default Navigation;
