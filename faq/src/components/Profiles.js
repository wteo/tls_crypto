import React from 'react';

import Profile from './Profile';

import styles from './Profiles.module.css';

function Profiles() {
    return (
        <>
            <h1 className={styles.team__title}>Meet the Team</h1>
            <div className={styles.profiles__wrapper}>
                <Profile name="John Smith" title="TLS Mentor" imageLink="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" description="sofjdh skljdf oisd jflks lksj f klj k lsdfk lksjdf ksdf jklsdf osdf skln sldkfh nbsdf jkshdf m,n lkfdsh lsndf kln dsojhf kmsdfb sdkjhf jksfbn mdsfbn jskfb smnfdb." />
                <Profile name="John Smith" title="TLS Mentor" imageLink="./" description="sofjdh skljdf oisd jflks lksj f klj k lsdfk lksjdf ksdf jklsdf osdf skln sldkfh nbsdf jkshdf m,n lkfdsh lsndf kln dsojhf kmsdfb sdkjhf jksfbn mdsfbn jskfb smnfdb." />
                <Profile name="John Smith" title="TLS Mentor" imageLink="./" description="sofjdh skljdf oisd jflks lksj f klj k lsdfk lksjdf ksdf jklsdf osdf skln sldkfh nbsdf jkshdf m,n lkfdsh lsndf kln dsojhf kmsdfb sdkjhf jksfbn mdsfbn jskfb smnfdb." />
                <Profile name="John Smith" title="TLS Mentor" imageLink="./" description="sofjdh skljdf oisd jflks lksj f klj k lsdfk lksjdf ksdf jklsdf osdf skln sldkfh nbsdf jkshdf m,n lkfdsh lsndf kln dsojhf kmsdfb sdkjhf jksfbn mdsfbn jskfb smnfdb." />
                <Profile name="John Smith" title="TLS Mentor" imageLink="./" description="sofjdh skljdf oisd jflks lksj f klj k lsdfk lksjdf ksdf jklsdf osdf skln sldkfh nbsdf jkshdf m,n lkfdsh lsndf kln dsojhf kmsdfb sdkjhf jksfbn mdsfbn jskfb smnfdb." />
            </div>
        </>
    );
}

export default Profiles;
