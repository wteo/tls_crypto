import React from 'react';

import Profile from './Profile';
import avatar from '../images/avatar.png';

import styles from './Profiles.module.css';

function Profiles() {
    return (
        <>
            <h1 className={styles.team__title}>Meet the Team</h1>
            <div className={styles.profiles__wrapper}>
                <Profile name="John Smith" title="TLS Mentor" imageLink={avatar} description="sofjdh skljdf oisd jflks lksj f klj k lsdfk lksjdf ksdf jklsdf osdf skln sldkfh nbsdf jkshdf m,n lkfdsh lsndf kln dsojhf kmsdfb sdkjhf jksfbn mdsfbn jskfb smnfdb." />
                <Profile name="John Smith" title="TLS Mentor" imageLink={avatar} description="sofjdh skljdf oisd jflks lksj f klj k lsdfk lksjdf ksdf jklsdf osdf skln sldkfh nbsdf jkshdf m,n lkfdsh lsndf kln dsojhf kmsdfb sdkjhf jksfbn mdsfbn jskfb smnfdb." />
                <Profile name="John Smith" title="TLS Mentor" imageLink={avatar} description="sofjdh skljdf oisd jflks lksj f klj k lsdfk lksjdf ksdf jklsdf osdf skln sldkfh nbsdf jkshdf m,n lkfdsh lsndf kln dsojhf kmsdfb sdkjhf jksfbn mdsfbn jskfb smnfdb." />
                <Profile name="John Smith" title="TLS Mentor" imageLink={avatar} description="sofjdh skljdf oisd jflks lksj f klj k lsdfk lksjdf ksdf jklsdf osdf skln sldkfh nbsdf jkshdf m,n lkfdsh lsndf kln dsojhf kmsdfb sdkjhf jksfbn mdsfbn jskfb smnfdb." />
                <Profile name="John Smith" title="TLS Mentor" imageLink={avatar} description="sofjdh skljdf oisd jflks lksj f klj k lsdfk lksjdf ksdf jklsdf osdf skln sldkfh nbsdf jkshdf m,n lkfdsh lsndf kln dsojhf kmsdfb sdkjhf jksfbn mdsfbn jskfb smnfdb." />
                <Profile name="John Smith" title="TLS Mentor" imageLink={avatar} description="sofjdh skljdf oisd jflks lksj f klj k lsdfk lksjdf ksdf jklsdf osdf skln sldkfh nbsdf jkshdf m,n lkfdsh lsndf kln dsojhf kmsdfb sdkjhf jksfbn mdsfbn jskfb smnfdb." />
            </div>
        </>
    );
}

export default Profiles;
