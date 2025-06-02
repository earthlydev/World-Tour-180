import React, { useState } from 'react';

const LinkItiDes = ({  itineraries, destinations, backendURL, refreshItiDes }) => {
    const [formData, setFormData] = useState({
        create_i_id: '',
        create_d_id: ''
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

        const create_i_id = parseInt(formData.create_i_id, 10);
        const create_d_id = parseInt(formData.create_d_id, 10);

        if (isNaN(create_i_id) || isNaN(create_d_id)) {
            console.error("Please select both an itinerary and a destination.");
            return;
        }

        try {
            const response = await fetch(backendURL + '/itinerarydestinations/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ create_i_id, create_d_id })
            });

            if (response.ok) {
                console.log("Linked Itinerary and Destination successfully.");
                refreshItiDes();
            } else {
                console.error("Error linking itinerary and destination.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>Link Itinerary and Destination</h2>
        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="create_i_id">Select an Itinerary</label>
            <select
                name="create_i_id"
                id="create_i_id"
                value={formData.create_i_id}
                onChange={handleChange}
                required
            >
            <option value="">Select</option>
                {itineraries.map((itinerary) => (
                    <option key={itinerary.itineraryID} value={itinerary.itineraryID}>
                        {itinerary.title}
                    </option>
                ))}
            </select>

                <label htmlFor="create_d_id">Select a Destination</label>
                <select
                    name="create_d_id"
                    id="create_d_id"
                    value={formData.create_d_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    {destinations.map((destination) => (
                        <option key={destination.destinationID} value={destination.destinationID}>
                            {destination.name}
                        </option>
                    ))}
                </select>
            <input type="submit" />
        </form>
        </>
    );

};

export default LinkItiDes;