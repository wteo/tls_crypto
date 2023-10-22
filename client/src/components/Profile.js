import React from 'react';

import styles from './Profile.module.css';

function Profile({ name, title, imageLink, description}) {
    return (
        <div className={styles.profiles__container}>
            <h3>{ name }</h3>
            <div className={styles.profiles__image}>
                <img src={imageLink} alt={'Profile picture of ' + name} />
            </div>
            <h6>{ title }</h6>
            <p>{ description }</p>
        </div>
    );
}

export default Profile;
