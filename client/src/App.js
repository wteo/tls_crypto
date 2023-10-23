import React, { useState, useRef, useEffect } from 'react';

import Navigation from './components/Navigation';
import Tiers from './components/Tiers';
import Accordion from './components/Accordion';
import Profiles from './components/Profiles';
import Footer from './components/Footer';

import styles from './App.module.css';

function App() {

  const [isChecklistClicked, setIsChecklistClicked] = useState(false);
  const [isModalHidden, setIsModalHidden] = useState(false);

  const modalRef = useRef(null);

  const openCheckListHandler = () => {
    setIsChecklistClicked(true);
    setTimeout(() => {
      setIsModalHidden(true);
    }, 10); // Delaying the state changes to ensure animation get to pay out.
  }

  
  const closeCheckListHandler = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalHidden(false);
      setIsChecklistClicked(false);
    }
  }

  useEffect(() => {

  }, [])

  return (
    <>
      <Navigation />
      <section id='about'>
        <Tiers />
      </section>
      <section className={styles.checklist__wrapper}>
        <br />
        <h1>Not sure where to start?</h1>
        <button onClick={openCheckListHandler}>Check our Crypto Bull Run checklist!</button>
        { isChecklistClicked &&
          <>
            <div onClick={closeCheckListHandler} className={`${styles.checklist__overlay} ${isModalHidden ? styles.dark : ''}`}>
                <div ref={modalRef} className={`${styles.checklist__modal} ${isModalHidden ? styles.active : ''}`}>
                  <div className={styles.checklist__container}>
                    <div>
                    <p>Click me! ohdfs ks glkjsdhfg jlshdgflsng lkjsdf kndfg lksdgj skdhfg osidgf osdnfg pisfdguodsfng sfgd</p>
                    </div>
                  </div>
                </div>
            </div>
          </>
        }
      </section>
      <section id='team'>
        <Profiles />
      </section>
      <section id='faq'>
        <Accordion title='General' category='general'/>
        <br />
        <br />
        <Accordion title='TLS Crypto Hub' category='hub'/>
      </section>
      <Footer />
    </>
  );
}

export default App;
