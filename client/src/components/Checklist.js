import React from 'react';

import styles from './Checklist.module.css';

const checklistData = [{
    sectionTitle: 'Self-Assessment',
    actionItems: ['Understand your risk tolerance.', 'Define your investment goals: short-term trading vs. long-term holding']
}, {
    sectionTitle: 'Education & Research',
    actionItems: ['Stay updated with market news and trends.', 'Deep dive into potential high-growth cryptocurrencies.']
}, {
    sectionTitle: 'Financial Planning',
    actionItems: ['Allocate a specific budget for crypto investments.', 'Diversify your portfolio across different assets.']
}, {
    sectionTitle: 'Security Measures',
    actionItems: ['Use trusted and secure wallets and exchanges.', 'Enable two-factor authentication and regularly update passwords.']
}, {
    sectionTitle: 'Mental & Emotional Preparedness',
    actionItems: ['Stay connected with a community or group for support.', 'Develop strategies to manage stress and avoid panic selling.']
}, {
    sectionTitle: 'Mitigation Strategies',
    actionItems: ['Set clear entry and exit points.', 'Use tools to protect your investments during market volatility.']
}, {
    sectionTitle: 'Stay Updated',
    actionItems: ['Subscribe to reliable crypto news sources and alerts.', 'Engage with experts and thought leaders in the field.']
}, {
    sectionTitle: 'Regular Portfolio Review',
    actionItems: ['Monitor your portfolio\'s performance', 'Rebalance assets based on market conditions and personal goals.']
}, {
    sectionTitle: 'Exit Strategy',
    actionItems: ['Define your profit-taking strategy.', 'Understand the tax implications of your trades.']
}, {
    sectionTitle: 'Post-Bull Run',
    actionItems: ['Reflect on your investment decisions and outcomes.', 'Plan for the next phase: reinvesting, diversifying, or cashing out.']
}]

function Checklist() {
    return (
        <div className={styles[`checklist__content-wrapper`]}>
            {
                checklistData.map((section, index) => {
                    return (
                        <div key={index} className={styles.checklist__content}>
                            <h3 className={styles.checklist__title}>{Number(index) + 1}. {section.sectionTitle}</h3>
                            <ul className={styles.checklist__list}>
                                { section.actionItems.map((actionItem, index) => (
                                            <li className={styles.checklist__steps} key={index}>
                                                <input type='checkbox' />
                                                <label>{actionItem}</label>
                                            </li>
                                        )
                                    ) 
                                }
                            </ul>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Checklist;