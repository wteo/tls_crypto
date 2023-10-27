import React, { useState, useCallback, useEffect } from 'react';
import styles from './Accordion.module.css';
import AccordionItem from "./AccordionItem";

const apiUrl = 'http://localhost:8000/api/FAQ/';

function Accordion(props) {
    
    const [accordionItems, setAccordionItems] = useState([]);

    const fetchData = useCallback(async(url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data.data.items.filter(item => item.category === props.category);
    }, [props.category]);

    useEffect(() => {
        fetchData(apiUrl)
            .then(data => {
                setAccordionItems(data);
            })
            .catch(error => {
                console.error("Error fetching accordion items:", error);
            });
    }, [fetchData]); 

    return (
        <div className={styles.accordion}>
            <h1 className={styles.accordion__title}>{ props.title }</h1>
            { accordionItems.map((item, index) => 
                <AccordionItem 
                    key={index} 
                    question={item.question} 
                    answer={item.answer} 
                    list={item.list ?? []} 
                />) 
            }
        </div>
    );
}

export default Accordion;
