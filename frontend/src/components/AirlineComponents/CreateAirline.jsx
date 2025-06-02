import React, { useState } from 'react';

const CreateAirline = ({ backendURL, refreshAirline }) => {
    const [formData, setFormData] = useState({
        create_name: '',
        create_website: '',
        create_phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(backendURL + '/airlines/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Airline created successfully.');
                refreshAirline();
            } else {
                console.error("Error creating airline.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };


    return (
        <>
        <h2>New Airline</h2>

        <form className='cuForm' onSubmit={handleSubmit}>
        <label htmlFor="create_name">Name </label>
            <input
                type="text"
                name="create_name"
                id="create_name"
                value={formData.create_name}
                onChange={handleChange}
            />
        
        <label htmlFor="create_website">Website </label>
            <input
                type="text"
                name="create_website"
                id="create_website"
                value={formData.create_website}
                onChange={handleChange}
            />
        <label htmlFor="create_phone">Phone </label>
            <input
                type="text"
                name="create_phone"
                id="create_phone"
                value={formData.create_phone}
                onChange={handleChange}
            />
        <input type="submit" />
        </form>

        </>
    );
}; 

export default CreateAirline; 