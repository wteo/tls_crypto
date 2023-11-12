import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';

import styles from './Navigation.module.scss';

function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hideNav, setHideNav] = useState(false);
    const [prevScrollTop, setPrevScrollTop] = useState(0);

    const toggleMenu = () => setIsMenuOpen(prevState => !prevState);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const viewportHeight = window.innerHeight;
            const threshold = 0.40 * viewportHeight;
        
            if (currentScrollTop < prevScrollTop) {
                // User is scrolling up
                setHideNav(false);
            } else {
                // User is scrolling down
                setHideNav(currentScrollTop > threshold);
            }
        
            // Update the previous scroll position
            setPrevScrollTop(currentScrollTop);
        };
        
        // Add the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Cleanup: Remove the scroll event listener when the component is unmounted
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollTop]);

    const Logo = () => (
        <a href="/">
            <img className={styles.navigation__logo} src="https://i0.wp.com/thelazysociety.com/wp-content/uploads/2020/02/The-Lazy-Society-logo.png?fit=220%2C194&ssl=1" alt="TLS Logo" />
        </a>
    );

    const MenuItems = () => (
        <>
            <li className={styles['navigation__menu-item']} onClick={toggleMenu}>
                <Link to='about' spy={true} smooth={true} offset={-120} duration={250} onClick={toggleMenu}>About Us</Link>
                <div className={styles.navigation__highlight}></div>
            </li>
            <li className={styles['navigation__menu-item']} onClick={toggleMenu}>
                <Link to='checklist' spy={true} smooth={true} offset={-60} duration={250} onClick={toggleMenu}>Checklist</Link>
                <div className={styles.navigation__highlight}></div>
            </li>
            <li className={styles['navigation__menu-item']} onClick={toggleMenu}>
                <Link to='team' spy={true} smooth={true} offset={80} duration={250} onClick={toggleMenu}>The Team</Link>
                <div className={styles.navigation__highlight}></div>
            </li>
            <li className={styles['navigation__menu-item']} onClick={toggleMenu}>
                <Link to='faq' spy={true} smooth={true} offset={80} duration={250} onClick={toggleMenu}>FAQ</Link>
                <div className={styles.navigation__highlight}></div>
            </li>
        </>
    );

    return (
        <header>
            {/* Desktop Navigation */}
            <nav className={`${styles.navigation} ${hideNav ? styles.hidden : ''}`}>
                <ul className={styles['navigation__menu-list']}>
                    <li className={styles['navigation__logo-wrapper']}><Logo /></li>
                    <MenuItems />
                </ul>
            </nav>

            {/* Mobile Navigation */}
            <button className={styles['navigation__toggle-btn']} onClick={toggleMenu}>
                {isMenuOpen ? 'X' : '≡'}
            </button>
            <div className={`${styles['navigation__mobile-topbar']} ${hideNav ? styles.hidden : ''}`}>
                <div className={styles['navigation__mobile-logo']}><Logo /></div>
            </div>
            <ul className={`${styles['navigation__mobile-menu-list']} ${isMenuOpen ? styles['navigation__mobile-menu--open'] : ''}`}>
                <MenuItems />
            </ul>
            <div onClick={toggleMenu} className={styles.navigation__overlay} style={{ display: isMenuOpen ? 'block' : 'none' }} />
        </header>
    );
}

export default Navigation;
