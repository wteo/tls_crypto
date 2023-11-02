import React from 'react';

import styles from './AboutUs.module.css';

function AboutUs() {
    return (
        <section id='about'>
            <div>
                <h1>Discover The Lazy Society's Crypto Journey</h1>
                <p>Welcome to The Lazy Society, where we inspire you to live smarter, not harder. </p>
                <p>
                    Our mission? To demystify crypto, making it accessible and enjoyable for everyone. 
                    We believe in the power of cryptocurrency to reshape our financial future, and we're here to guide you every step of the way. 
                    With our curated learning paths and expert insights, we aim to keep things light, fun, and engaging, without the heavy jargon.
                </p>
                <p>
                    So, whether you're new to crypto or looking to enhance your knowledge, join us on this exciting journey. 
                    Dive in, enjoy the ride, and let's embrace the future of finance together!
                </p>
            </div>
            <div className={styles[`about__video--wrapper`]}>
                <iframe 
                    className={styles.about__video} 
                    src='https://www.youtube.com/embed/0BDRYtRwdWM?autoplay=1'
                    title='Placeholder video'
                    frameborder='0' 
                    allowfullscreen 
                />
            </div>
        </section>
    );
}

export default AboutUs;