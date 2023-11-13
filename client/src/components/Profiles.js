import React from 'react';

// profile images
import rosh from '../images/rosh.jpg';
import ant from '../images/ant.jpg';
import marc from '../images/marc.jpg';
import alex from '../images/alex.jpg';
import wendy from '../images/wendy.jpg';

import Profile from './Profile';

import styles from './Profiles.module.scss';

function Profiles() {

    const profileData = [{
        name: `Roshymun "Rosh"`,
        title: `Co-Founder & Self-Proclaimed El’ Presidente`,
        imageLink: rosh,
        description: `Meet Rosh, a driving force behind The Lazy Society. Living by the creed "work smarter, not harder," 
        he effortlessly juggles life's demands and dreamy escapes. The Lazy Society sprang to life in 2018, 
        a brainchild born from Rosh's quest to escape work monotony and a touch of wanderlust. 
        His heart beats for family adventures, the thrill of snowy descents, and the ever-evolving world of cryptocurrency. 
        Since his crypto dive in 2017, Rosh has become a beacon for both novices and those treading the intermediate waters, offering insights, airdrop tips, and more. 
        But it doesn't end there. With a sharp business acumen, he's crafted an advanced tier in The Lazy Society, 
        amplifying its value and ensuring members harness the full potential of the crypto realm.`,
    }, {
        name: 'Ant "Gotsauss" ',
        title: 'Co-Founder & Physical Wellbeing Wizard',
        imageLink: ant,
        description: `From his early days navigating the IT sector to discovering his true passion in movement, Ant is a testament to the power of transformation. 
        At 37, he didn't just pick up a new hobby; he mastered the art of the handstand. But Ant's journey doesn't stop at physical feats. 
        He's also a crypto enthusiast with a twist. Before delving into the intricate world of digital currencies, Ant firmly believes in fortifying all 3: 
        the mind, body and spirit. It's this holistic approach that sets him apart in the crypto trading realm. 
        With a blend of serious strategy and a sprinkle of fun, Ant mentors individuals in both the physical and digital domains. 
        Whether perfecting a handstand or exploring crypto, Ant blends expertise with flair to guide your journey.
        `
    }, {
        name: `Marc`,
        title: `Co-Founder & IT Security Maestro`,
        imageLink: marc,
        description: `Marc, a pivotal member of The Lazy Society, seamlessly blends his IT security expertise with a profound commitment to community support. 
        Joining Rosh and Ant in the nascent stages, he has been instrumental in shaping the society's ethos. Marc's professional life revolves around IT security, 
        where he excels, but his heart beats for the community at TLS. His journey is a blend of professional rigor and personal passion, evident in his love for 
        scuba diving and the fulfillment he finds in his personal life. Marc is known for going the extra mile, often dipping into his own resources to resolve 
        issues that members face. His presence in The Lazy Society is not just about imparting knowledge; it's about creating a nurturing and inclusive space for all.
        `
    }, 
    {
        name: `Alex`,
        title: `Mindset Guru`,
        imageLink: alex,
        description: `With over a decade and half of Information Technology experience as an analyst, product owner, delivery and iteration manager, Alex Holland know how connect with talented individuals. 
        With experience of managing both national and international team members to deliver results, Alex's knows how to get the best out of people and ensures they are always set up for success. 
        Alex is always excited for a new challenge whether that is his personal best lift at the gym, time spent in his personal ice bath or keeping his two young sons from driving his wife crazy.` 
    }, 
    {
        name: 'Wendy',
        title: 'Crypto Maven & Web Development Enthusiast',
        imageLink: wendy,
        description: `
        Merging cryptocurrency insights with web development, Wendy stands out in both realms. 
        Since 2017, she's tracked the 4-year Bitcoin halving cycle, armed with a decade's experience in finance. 
        Beyond crypto, Wendy's transition to web development showcases her love for design and coding. 
        Her dual expertise offers a rare blend of financial wisdom and creative innovation. 
        Having experienced two cryptocurrency market cycles, her insights are sharp and strategic. 
        Wendy champions dollar-cost averaging, combining research, long-term holding, and timely trading to bolster her Bitcoin and Ethereum portfolio.
        `
    }];
    
    return (
        <section id='team'>
            <h1 className={styles.team__title}>Meet the Team</h1>
            <div className={styles.profiles__wrapper}>
                { profileData.map((profile, index) => <Profile key={index} name={profile.name} title={profile.title} imageLink={profile.imageLink} description={profile.description} />)}
            </div>
        </section>
    );
}

export default Profiles;
