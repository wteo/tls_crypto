import React, { useState } from 'react';
import styles from './ContactUs.module.scss';

function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const validate = (name, value) => {
        switch (name) {
            case 'name':
                if (value.length < 3) {
                    return 'Name must be at least 3 characters long';
                }
                break;
            case 'email':
                if (!/\S+@\S+\.\S+/.test(value)) {
                    return 'Email must be a valid email address';
                }
                break;
            case 'message':
                if (value.length < 5) {
                    return 'Please enter a valid message.';
                }
                break;
            default:
                return '';
        }
        return '';
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setFormErrors({
            ...formErrors,
            [name]: ''
        });
    };

    const [formResponse, setFormResponse] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate all fields before submitting
        const newErrors = {
            name: validate('name', formData.name),
            email: validate('email', formData.email),
            message: validate('message', formData.message)
        };
        setFormErrors(newErrors);

        // Check if there are any errors
        if (!Object.values(newErrors).some(error => error)) {

            const url = process.env.REACT_APP_URL_API_FORMSPREE;
            
            // Form submission logic here
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            .then(response => {

                setIsFormSubmitted(true);

                if (response.ok) {
                    setFormData({
                        name: '',
                        email: '',
                        message: ''
                    });
                    setFormResponse('Thank you for sending us a message. We\'ll be in touch soon!'); 
                } else {
                    setFormResponse('Apologies! We are facing a sever issue. Please try again later.'); 
                    throw new Error('Network response was not ok.');
                }
            })
            .catch(error => {
                console.log(error);
                setFormResponse('Apologies! We are facing a sever issue. Please try again later.'); 
            });
        }
    };

    return (
        <section id='contact' className={styles.contact}>
            <form className={styles.contact__form} onSubmit={handleSubmit} onClick={ () => setIsFormSubmitted(false) }>
                <h1 className={styles.contact__title}>Want to get in touch?</h1>
                { isFormSubmitted && <p>{ formResponse }</p> }
                <label>Name</label>
                <input className={formErrors.name ? styles.inputError : ''} name="name" value={formData.name} onChange={handleChange} />
                {formErrors.name && <p className={styles.error}>{formErrors.name}</p>}
                <label>Email</label>
                <input className={formErrors.email ? styles.inputError : ''} name="email" type="email" value={formData.email} onChange={handleChange} />
                {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}
                <label>Message</label>
                <textarea className={formErrors.message ? styles.textAreaError : ''} name="message" value={formData.message} onChange={handleChange} />
                {formErrors.message && <p className={styles.error}>{formErrors.message}</p>}
                <button type="submit">Send Message</button>
            </form>
        </section>
    );
}

export default ContactUs;
