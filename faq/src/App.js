import React, { useState, useRef } from 'react';

import Navigation from './components/Navigation';
import Tiers from './components/Tiers';
import Accordion from './components/Accordion';
import Footer from './components/Footer';

import styles from './App.module.css';

function App() {

  const [isChecklistClicked, setIsChecklistClicked] = useState(false);
  const modalRef = useRef(null);

  const openCheckListHandler = () => {
    setIsChecklistClicked(true);
  }

  
  const closeCheckListHandler = (event) => {
    // Check if the click was outside the modal
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsChecklistClicked(false);
    }
  }


  return (
    <>
      <Navigation />
      <section>
        <Tiers />
      </section>
      <section className={styles.checklist__wrapper}>
        <br />
        <h1>Not sure where to start?</h1>
        <button onClick={openCheckListHandler}>Check our Crypto Bull Run checklist!</button>
        { isChecklistClicked &&
          <>
            <div onClick={closeCheckListHandler} className={styles.checklist__overlay}>
              <div ref={modalRef} className={styles.checklist__modal}>
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
      <section>
        The Team
      </section>
      <section>
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
