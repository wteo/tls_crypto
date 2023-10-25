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
        <h1>Discover The Lazy Society's Crypto Journey</h1>
        <p>
            Welcome to The Lazy Society, where we inspire you to live smarter, not harder. 
        </p>
        <p>
          Our mission? To demystify crypto, making it accessible and enjoyable for everyone. 
          We believe in the power of cryptocurrency to reshape our financial future, and we're here to guide you every step of the way. 
          With our curated learning paths and expert insights, we aim to keep things light, fun, and engaging, without the heavy jargon.
        </p>
        <p>
          So, whether you're new to crypto or looking to enhance your knowledge, join us on this exciting journey. 
          Dive in, enjoy the ride, and let's embrace the future of finance together!
        </p>
        <br />
      </section>
      <section>
        <h1>Your Crypto Journey: Choose your Path</h1>
        <Tiers />
      </section>
      <section className={styles.checklist__wrapper}>
        <br />
        <h1>Discover Your Own Crypto Journey!</h1>
        <p>
          Feeling overwhelmed with the world of cryptocurrency? Don't worry, we've got you covered! 
          Check out our quick and easy checklist to help you prepare for the next Crypto Bull Run.
        </p>
        <br />
        <button onClick={openCheckListHandler}>Start the Checklist Now!</button>
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
