import React from 'react';

import Profile from './Profile';
import avatar from '../images/avatar.png';

import styles from './Profiles.module.css';

function Profiles() {

    const profileData = [{
        name: 'John Smith',
        title: 'Founder',
        imageLink: avatar,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. Fusce non ante sed lorem rutrum feugiat. Vestibulum pellentesque, purus ut dignissim dictum, risus lectus porta purus, at facilisis odio sapien in ante. Aliquam erat volutpat. Sed ac tempus neque. Curabitur euismod libero in neque mollis, sit amet fringilla libero finibus'
    }, {
        name: 'John Smith',
        title: 'Founder',
        imageLink: avatar,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. Fusce non ante sed lorem rutrum feugiat. Vestibulum pellentesque, purus ut dignissim dictum, risus lectus porta purus, at facilisis odio sapien in ante. Aliquam erat volutpat. Sed ac tempus neque. Curabitur euismod libero in neque mollis, sit amet fringilla libero finibus'
    }, {
        name: 'John Smith',
        title: 'Founder',
        imageLink: avatar,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. Fusce non ante sed lorem rutrum feugiat. Vestibulum pellentesque, purus ut dignissim dictum, risus lectus porta purus, at facilisis odio sapien in ante. Aliquam erat volutpat. Sed ac tempus neque. Curabitur euismod libero in neque mollis, sit amet fringilla libero finibus'
    }, {
        name: 'John Smith',
        title: 'Founder',
        imageLink: avatar,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. Fusce non ante sed lorem rutrum feugiat. Vestibulum pellentesque, purus ut dignissim dictum, risus lectus porta purus, at facilisis odio sapien in ante. Aliquam erat volutpat. Sed ac tempus neque. Curabitur euismod libero in neque mollis, sit amet fringilla libero finibus'
    }, {
        name: 'John Smith',
        title: 'Founder',
        imageLink: avatar,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. Fusce non ante sed lorem rutrum feugiat. Vestibulum pellentesque, purus ut dignissim dictum, risus lectus porta purus, at facilisis odio sapien in ante. Aliquam erat volutpat. Sed ac tempus neque. Curabitur euismod libero in neque mollis, sit amet fringilla libero finibus'
    }, {
        name: 'John Smith',
        title: 'Founder',
        imageLink: avatar,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. Fusce non ante sed lorem rutrum feugiat. Vestibulum pellentesque, purus ut dignissim dictum, risus lectus porta purus, at facilisis odio sapien in ante. Aliquam erat volutpat. Sed ac tempus neque. Curabitur euismod libero in neque mollis, sit amet fringilla libero finibus'
    }];
    return (
        <>
            <h1 className={styles.team__title}>Meet the Team</h1>
            <div className={styles.profiles__wrapper}>
                { profileData.map(profile => <Profile name={profile.name} title={profile.title} imageLink={profile.imageLink} description={profile.description} />)}
            </div>
        </>
    );
}

export default Profiles;
