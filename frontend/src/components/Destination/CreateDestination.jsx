import React, { useState } from 'react';

const CreateDestination = ({ backendURL, refreshDestination }) => {
    const [formData, setFormData] = useState({
        create_name: '',
        create_country: '',
        create_timezone: '',
        create_visaRequired: false,
        create_currency: '',
        create_language: '',
        create_description: ''
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
            const response = await fetch(backendURL + '/destinations/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Destination created successfully.');
                refreshDestination();
            } else {
                console.error("Error creating destination.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>New Destination</h2>

        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="create_name">Name </label>
            <input
                type="text"
                name="create_name"
                id="create_name"
                value={formData.create_name}
                onChange={handleChange}
            />

            <label htmlFor="create_country">Country </label>
            <input
                type="text"
                name="create_country"
                id="create_country"
                value={formData.create_country}
                onChange={handleChange}
            />

            <label htmlFor="create_timezone">Timezone </label>
            <input
                type="text"
                name="create_timezone"
                id="create_timezone"
                value={formData.create_timezone}
                onChange={handleChange}
            />
            
            <label>Visa Required</label>
            <input
                type="radio"
                id="visaYes"
                name="create_visaRequired"
                checked={formData.create_visaRequired === true}
                onChange={() => setFormData({...formData, create_visaRequired: true})}
            />
            <label htmlFor="visaYes">Yes </label>
            <input
                type="radio"
                id="visaNo"
                name="create_visaRequired"
                checked={formData.create_visaRequired === false}
                onChange={() => setFormData({...formData, create_visaRequired: false})}
            />
            <label htmlFor="visaNo">No </label>
            
            <label htmlFor="create_currency">Currency </label>
            <input
                type="text"
                name="create_currency"
                id="create_currency"
                value={formData.create_currency}
                onChange={handleChange}
            />

            <label htmlFor="create_language">Language </label>
            <input
                type="text"
                name="create_language"
                id="create_language"
                value={formData.create_language}
                onChange={handleChange}
            />
            
            <label htmlFor="create_description">Description </label>
            <input
                type="text"
                name="create_description"
                id="create_description"
                value={formData.create_description}
                onChange={handleChange}
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateDestination;
