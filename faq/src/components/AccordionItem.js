import React, { useState } from 'react';
import styles from './AccordionItem.module.css';

function AccordionItem({ question, answer }) {

    const [isClicked, setIsClicked] = useState(false);

    const clickHandler = () => {
        setIsClicked(prevState => !prevState);
        console.log(isClicked);
    };

    return (
        <div className={styles.accordion__item}>
            <button onClick={clickHandler} className={styles.accordion__header}>{ question }</button>
            <div className={styles.accordion__content} style={{ display: isClicked ? 'block' : 'none' }}>
                <p>{ answer }</p>
            </div>
        </div>
    );
}

export default AccordionItem;