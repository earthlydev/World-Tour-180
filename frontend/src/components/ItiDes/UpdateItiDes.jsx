// Citation: copilot.microsoft.com
// Prompt: How do I link one table element to another table element in React

import React, { useState, useEffect } from 'react';

const UpdateItiDes = ({  itineraryDestinations, itineraries, destinations, backendURL, refreshItiDes }) => {
    const [formData, setFormData] = useState({
        update_id: '',
        update_i_id: '',
        update_d_id: ''
    })

     const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const update_id = parseInt(formData.update_id, 10);
        const update_i_id = parseInt(formData.update_i_id, 10);
        const update_d_id = parseInt(formData.update_d_id, 10);

        if (isNaN(update_id) || isNaN(update_i_id) || isNaN(update_d_id)) {
            console.error("Please select both an itinerary and a destination.");
            return;
        }

        try {
            const response = await fetch(backendURL + '/itinerarydestinations/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ update_id, update_i_id, update_d_id }),
            });

            if (response.ok) {
                console.log("Itinerary destination updated successfully.");
                refreshItiDes();
            } else {
                console.error("Error updating itinerary destination.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>Update Itinerary and Destination</h2>
        <form className='cuForm' onSubmit={handleSubmit}>
        <label htmlFor="update_id">Select a current Itinerary/Destination to Update </label>
            <select
                name="update_id"
                id="update_id"
                value={formData.update_id}
                onChange={handleChange}
                required
            >
                <option value="">Select</option>
                    {itineraryDestinations.map((itineraryDestination) => {
                        const itinerary = itineraries.find(i => i.itineraryID == itineraryDestination.itineraryID);
                        const title = itinerary ? itinerary.title : 'Unknown Itinerary';
                        return (
                            <option
                                key={itineraryDestination.idID}
                                value={itineraryDestination.idID}
                            >
                                {`${title} (ID: ${itineraryDestination.idID})`}
                            </option>
                        );
                    })}
            </select>
            <label htmlFor="update_i_id">Select an Itinerary </label>
            <select
                name="update_i_id"
                id="update_i_id"
                value={formData.update_i_id}
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
            <label htmlFor="update_d_id">Select a Destination</label>
            <select
                name="update_d_id"
                id="update_d_id"
                value={formData.update_d_id}
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

export default UpdateItiDes;