import { useState, useEffect } from 'react';

const UpdateItiDes = ({  itineraryDestiantions, itineraries, destinations, backendURL }) => {
    return (
        <>
        <h2>Update Itinerary and Destination</h2>
        <form className='cuForm'>
        <label htmlFor="select_itinerary">Select an Itinerary </label>
            <select
                name="select_itinerary"
                id="select_itinerary"
            >
                <option value="">Select an Itinerary</option>
                {itineraries.map((itinerary) => (
                    <option key={itinerary.id} value={itinerary.id}>
                       {itinerary.title}
                    </option>
                ))}
            </select>
            <label htmlFor="select_destination">Select a Destination </label>
            <select
                name="select_destination"
                id="select_destination"
            >
                <option value="">Select a Destination</option>
                {destinations.map((destiation) => (
                    <option key={destiation.id} value={destiation.id}>
                       {destiation.name}
                    </option>
                ))}
            </select>
            <input type="submit" />
        </form>
        </>
    );

};

export default UpdateItiDes;