
import { useState, useEffect } from 'react';

const LinkItiPas = ({ itineraries, passengers, backendURL }) => {
    const [selectedItinerary, setSelectedItinerary] = useState('');
    const [selectedPassenger, setSelectedPassenger] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedItinerary || !selectedPassenger) {
            setMessage('Please select both an itinerary and a passenger.');
            return;
        }
        
        try {
            const response = await fetch(`${backendURL}/itinerarypassengers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    itineraryID: selectedItinerary,
                    passengerID: selectedPassenger,
                }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setMessage('Successfully linked itinerary and passenger!');
                setSelectedItinerary('');
                setSelectedPassenger('');
            } else {
                setMessage(`Error: ${data.message || 'Failed to link itinerary and passenger.'}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            console.error('Error linking itinerary and passenger:', error);
        }
    };

    return (
        <>
        <h2>Link Itinerary and Passenger</h2>
        {message && <div className="message">{message}</div>}
        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="select_itinerary">Select an Itinerary </label>
            <select
                name="select_itinerary"
                id="select_itinerary"
                value={selectedItinerary}
                onChange={(e) => setSelectedItinerary(e.target.value)}
            >
                <option value="">Select an Itinerary</option>
                {itineraries.map((itinerary) => (
                    <option key={itinerary.id} value={itinerary.id}>
                       {itinerary.title}
                    </option>
                ))}
            </select>
            <label htmlFor="select_passenger">Select a Passenger </label>
            <select
                name="select_passenger"
                id="select_passenger"
                value={selectedPassenger}
                onChange={(e) => setSelectedPassenger(e.target.value)}
            >
                <option value="">Select a Passenger</option>
                {passengers.map((passenger) => (
                    <option key={passenger.id} value={passenger.id}>
                       {passenger.firstName} {passenger.lastName}
                    </option>
                ))}
            </select>
            <input type="submit" value="Link" />
        </form>
        </>
    );
};

export default LinkItiPas;