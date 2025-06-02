import React, { useState } from "react";

const CreateAirport = ({ backendURL, refreshAirport }) => {
    const [formData, setFormData] = useState({
            create_name: '',
            create_iata: '',
            create_city: '',
            create_country: '',
            create_timezone: ''
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
            const response = await fetch(backendURL + '/airports/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Airport created successfully.');
                refreshAirport();
            } else {
                console.error("Error creating airport.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>New Airport</h2>

        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="create_name">Name </label>
            <input
                type="text"
                name="create_name"
                id="create_name"
                value={formData.create_name}
                onChange={handleChange}
            />

            <label htmlFor="iata">IATA </label>
            <input
                type="text"
                name="create_iata"
                id="create_iata"
                value={formData.create_iata}
                onChange={handleChange}
            />

            <label htmlFor="create_city">City </label>
            <input
                type="text"
                name="create_city"
                id="create_city"
                value={formData.create_city}
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

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateAirport;
