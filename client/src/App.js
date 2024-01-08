import React, { useState, useEffect } from 'react';

import Navigation from './components/Navigation';
import AboutUs from './components/AboutUs';
import Tiers from './components/Tiers';
import Checklist from './components/Checklist';
import Profiles from './components/Profiles';
import Accordion from './components/Accordion';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

import styles from './App.module.scss';

// files
import checklist from './files/checklist.pdf';


function App() {

  const [isChecklistClicked, setIsChecklistClicked] = useState(false);
  const [isModalHidden, setIsModalHidden] = useState(false);

  const openCheckListHandler = () => {
    setIsChecklistClicked(true);
    setTimeout(() => {
      setIsModalHidden(true);
    }, 10); // Delaying the state changes to ensure animation get to pay out.
  }

  
  const closeCheckListHandler = (event) => {
    if (event.target.getAttribute('data-id') === 'modal-overlay' || event.target.getAttribute('data-id') === 'close-button') {
      setIsModalHidden(false);
      setIsChecklistClicked(false);
    }
  }

  useEffect(() => {

  }, [])

  return (
    <>
      <Navigation />
      <AboutUs />
      <Tiers />
      <section className={styles.checklist__wrapper} id='checklist'>
        <br />
        <h1>Discover Your Own Crypto Journey!</h1>
        <p>
          Dive into the dynamic world of cryptocurrencies with our comprehensive guide. 
          From understanding blockchain basics to preparing for market surges, our checklist ensures you're well-equipped for the next Crypto Bull Run. 
        </p>
        <br />
        <button onClick={openCheckListHandler}>Start the Checklist Now!</button>
        { isChecklistClicked &&
          <>
            <div onClick={closeCheckListHandler} data-id='modal-overlay' className={`${styles.checklist__overlay} ${isModalHidden ? styles.dark : ''}`}>
                <div className={`${styles.checklist__modal} ${isModalHidden ? styles.active : ''}`}>
                  <button data-id='close-button' id={styles[`checklist__close-button`]} onClick={closeCheckListHandler}>X</button>
                  <h1>Crypto Bull Run Checklist</h1>
                  <div className={styles.checklist__container}>
                    <Checklist />
                  </div>
                </div>
            </div>
          </>
        }
        <p className={styles.download__link}>Download a file copy <a href={checklist} target='_blank' rel='noreferrer'>here</a></p>
      </section>
      <Profiles />
      <section id='faq'>
        <Accordion title='Frequently Asked Questions' category='general'/>
      </section>
      <ContactUs />
      <Footer />
    </>
  );
}

export default App;
