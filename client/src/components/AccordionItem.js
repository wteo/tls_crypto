import React, { useState } from 'react';
import styles from './AccordionItem.module.scss';

function AccordionItem({ question, answer, list }) {

    const [isClicked, setIsClicked] = useState(false);

    const clickHandler = () => {
        setIsClicked(prevState => !prevState);
        console.log(isClicked);
    };

    return (
        <div className={styles.accordion__item}>
            <button onClick={clickHandler} className={styles.accordion__header}>
                <h4>{ question }</h4>
                <i>{ isClicked ? '-' : '+'}</i>
            </button>
            <div className={styles.accordion__content} style={{ maxHeight: isClicked ? '300px' : '0' }}>
                <p>{ answer }</p>
                <ul>
                    { list.map((item, index) => <li key={index}>{item}</li>) }
                </ul>
            </div>
        </div>
    );
}

export default AccordionItem;