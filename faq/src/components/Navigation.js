import React, { useState, useEffect } from 'react';

import styles from './Navigation.module.css';

function Navigation() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [hideNav, setHideNav] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    }

    
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const viewportHeight = window.innerHeight;
            const threshold = 0.40 * viewportHeight; // 30% of the viewport height
        
            if (currentScrollTop <= threshold) {
                // User is within the top 30% of the page
                setHideNav(false);
            } else {
                // User has scrolled beyond the top 30% of the page
                setHideNav(true);
            }
            setLastScrollTop(currentScrollTop);
        };
        

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);


    
    return (
        <header>
            <nav className={`${styles.nav} ${hideNav ? styles.hidden : ''}`}>
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
            {
            // Mobile content only 
            <>
                <button className={styles.nav__hamburger} onClick={toggleMenu}>
                    { isMenuOpen ? 'X' : '≡' }
                </button>
                <div className={`${styles.nav__top__bar} ${hideNav ? styles.hidden : ''}`}>
                    <div className={styles.nav__icon__image__mobile}>
                        <a href="/">
                            <img className={styles.nav__icon__image} src="https://i0.wp.com/thelazysociety.com/wp-content/uploads/2020/02/The-Lazy-Society-logo.png?fit=220%2C194&ssl=1" alt="TLS Logo"/>
                        </a>
                    </div>
                </div>
                <ul className={`${styles.nav__menu__mobile} ${isMenuOpen ? styles.navOpen : ''}`}>
                    <li className={styles.nav__menu__title} onClick={toggleMenu}>About Us</li>
                    <li className={styles.nav__menu__title} onClick={toggleMenu}>The Team</li>
                    <li className={styles.nav__menu__title} onClick={toggleMenu}>FAQ</li>
                </ul>
                <div 
                    onClick={toggleMenu} 
                    className={styles.nav__overlay} 
                    style={{ display: isMenuOpen ? 'block' : 'none' }} 
                />
            </>
            // Mobile content ends here 
            }
      </header>
    );
}

export default Navigation;
