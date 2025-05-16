import { useState, useEffect } from 'react';

const UpdateItiPas = ({ itineraryPassengers, itineraries, passengers, backendURL }) => {
    const [selectedRelationship, setSelectedRelationship] = useState('');
    const [selectedItinerary, setSelectedItinerary] = useState('');
    const [selectedPassenger, setSelectedPassenger] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (selectedRelationship) {
            // Find the selected relationship in itineraryPassengers
            const relationship = itineraryPassengers.find(
                (rel) => rel.ipID.toString() === selectedRelationship
            );
            
            if (relationship) {
                setSelectedItinerary(relationship.itineraryID.toString());
                setSelectedPassenger(relationship.passengerID.toString());
            }
        } else {
            setSelectedItinerary('');
            setSelectedPassenger('');
        }
    }, [selectedRelationship, itineraryPassengers]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!selectedRelationship || !selectedItinerary || !selectedPassenger) {
            setMessage('Please select a relationship to update and provide new values.');
            return;
        }
        
        try {
            const response = await fetch(`${backendURL}/itinerarypassengers/${selectedRelationship}`, {
                method: 'PUT',
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
                setMessage('Successfully updated itinerary passenger relationship!');
            } else {
                setMessage(`Error: ${data.message || 'Failed to update relationship.'}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
            console.error('Error updating itinerary passenger relationship:', error);
        }
    };

    return (
        <>
        <h2>Update Itinerary and Passenger</h2>
        {message && <div className="message">{message}</div>}
        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="select_relationship">Select a Relationship to Update</label>
            <select
                name="select_relationship"
                id="select_relationship"
                value={selectedRelationship}
                onChange={(e) => setSelectedRelationship(e.target.value)}
            >
                <option value="">Select a Relationship</option>
                {itineraryPassengers.map((rel) => {
                    const itinerary = itineraries.find(i => i.id === rel.itineraryID);
                    const passenger = passengers.find(p => p.id === rel.passengerID);
                    return (
                        <option key={rel.ipID} value={rel.ipID}>
                            {itinerary?.title || 'Unknown Itinerary'} - 
                            {passenger ? `${passenger.firstName} ${passenger.lastName}` : 'Unknown Passenger'}
                        </option>
                    );
                })}
            </select>

            <label htmlFor="update_itinerary">Update Itinerary</label>
            <select
                name="update_itinerary"
                id="update_itinerary"
                value={selectedItinerary}
                onChange={(e) => setSelectedItinerary(e.target.value)}
                disabled={!selectedRelationship}
            >
                <option value="">Select an Itinerary</option>
                {itineraries.map((itinerary) => (
                    <option key={itinerary.id} value={itinerary.id}>
                       {itinerary.title}
                    </option>
                ))}
            </select>

            <label htmlFor="update_passenger">Update Passenger</label>
            <select
                name="update_passenger"
                id="update_passenger"
                value={selectedPassenger}
                onChange={(e) => setSelectedPassenger(e.target.value)}
                disabled={!selectedRelationship}
            >
                <option value="">Select a Passenger</option>
                {passengers.map((passenger) => (
                    <option key={passenger.id} value={passenger.id}>
                       {passenger.firstName} {passenger.lastName}
                    </option>
                ))}
            </select>
            <input type="submit" value="Update" />
        </form>
        </>
    );
};

export default UpdateItiPas;