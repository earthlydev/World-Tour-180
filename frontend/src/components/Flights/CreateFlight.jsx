// Citation: copilot.microsoft.com
// Prompt: How do I parse strings to int and format date from the form data back to JSON.stringify
import React, { useState } from "react";

const CreateFlight = ({ itineraries, airlines, airports, backendURL, refreshFlight }) => {
    const [formData, setFormData] = useState({
        create_i_id: '',
        create_a_id: '',
        create_bookingNum: '',
        create_flightNum: '',
        create_depAirport: '',
        create_arrAirport: '',
        create_depTime: '',
        create_arrTime: '',
        create_cabinClass: '',
        create_notes:''
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

        const formatForSQL = (datetimeLocalString) => {
        if (!datetimeLocalString) return null;
        const date = new Date(datetimeLocalString);
        return date.toISOString().slice(0, 19).replace('T', ' ');
    };

        const payload = {
            ...formData,
            create_i_id: parseInt(formData.create_i_id, 10),
            create_a_id: parseInt(formData.create_a_id, 10),
            create_depAirport: parseInt(formData.create_depAirport, 10),create_arrAirport: parseInt(formData.create_arrAirport, 10),
            create_depTime: formatForSQL(formData.create_depTime),
            create_arrTime: formatForSQL(formData.create_arrTime) 
        };

        try {
            const response = await fetch(backendURL + '/flights/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log('Flight created successfully.');
                refreshFlight();
            } else {
                console.error("Error creating flight.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>New Flight</h2>

        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="create_i_id">Select an Itinerary </label>
            <select
                name="create_i_id"
                id="create_i_id"
                value={formData.create_i_id}
                onChange={handleChange}
                required
            >
                <option value="">Select</option>
                {itineraries.map((itinerary) => (
                    <option key={itinerary.id} value={itinerary.itineraryID}>
                       {itinerary.title}
                    </option>
                ))}
            </select>

            <label htmlFor="create_a_id">Select an Airline </label>
            <select
                name="create_a_id"
                id="create_a_id"
                value={formData.create_a_id}
                onChange={handleChange}
                required
            >
                <option value="">Select an Airline</option>
                {airlines.map((airline) => (
                    <option key={airline.airlineID} value={airline.airlineID}>
                       {airline.airlineName}
                    </option>
                ))}
            </select>

            <label htmlFor="create_bookingNum">Booking Reference Number</label>
            <input
                type="text"
                name="create_bookingNum"
                id="create_bookingNum"
                value={formData.create_bookingNum}
                onChange={handleChange}
                required
            />

            <label htmlFor="create_flightNum">Flight Number </label>
            <input
                type="text"
                name="create_flightNum"
                id="create_flightNum"
                value={formData.create_flightNum}
                onChange={handleChange}
            />
            
            <label htmlFor="create_depAirport">Select The Depature Airport </label>
            <select
                name="create_depAirport"
                id="create_depAirport"
                value={formData.create_depAirport}
                onChange={handleChange}
            >
                <option value="">Select an Airport</option>
                {airports.map((airport) => (
                    <option key={airport.airportID} value={airport.airportID}>
                       {airport.airportName}
                    </option>
                ))}
            </select>

            <label htmlFor="create_arrAirport">Select The Arrival Airport</label>
            <select
                name="create_arrAirport"
                id="create_arrAirport"
                value={formData.create_arrAirport}
                onChange={handleChange}
            >
                <option value="">Select an Airport</option>
                {airports.map((airport) => (
                    <option key={airport.airportID} value={airport.airportID}>
                       {airport.airportName}
                    </option>
                ))}
            </select>
            
            <label htmlFor="create_depTime">Depature Time </label>
            <input
                type="datetime-local"
                name="create_depTime"
                id="create_depTime"
                value={formData.create_depTime}
                onChange={handleChange}
            />
            
            <label htmlFor="create_arrTime">Arrival Time </label>
            <input
                type="datetime-local"
                name="create_arrTime"
                id="create_arrTime"
                value={formData.create_arrTime}
                onChange={handleChange}
            />
            
            <label htmlFor="create_cabinClass">Cabin Class </label>
            <input
                type="text"
                name="create_cabinClass"
                id="create_cabinClass"
                value={formData.create_cabinClass}
                onChange={handleChange}
            />
            
            <label htmlFor="create_notes">Notes </label>
            <input
                type="text"
                name="create_notes"
                id="create_notes"
                value={formData.create_notes}
                onChange={handleChange}
            />


            <input type="submit" />
        </form>
        </>
    );
};

export default CreateFlight;
