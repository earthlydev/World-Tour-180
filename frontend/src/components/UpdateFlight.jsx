const UpdateFlight = ({ flights, itineraries, airlines ,airports, backendURL, refreshFlight }) => {
    return (
        <>
        <h2>Update a Flight</h2>

        <form className='cuForm'>
            <label htmlFor="update_flight">Flight to Update </label>
            <select
                name="update_flight_id"
                id="update_flight_id"
            >
                <option value="">Select a flight</option>
                {flights.map((flight) => (
                    <option key={flight.id} value={flight.id}>
                       {flight.bookingReferenceNum}
                    </option>
                ))}
            </select>
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

            <label htmlFor="select_airline">Select an Airline </label>
            <select
                name="select_airline"
                id="select_airline"
            >
                <option value="">Select an Airline</option>
                {airlines.map((airline) => (
                    <option key={airline.airlineID} value={airline.airlineID}>
                       {airline.airlineName}
                    </option>
                ))}
            </select>

            <label htmlFor="update_booking_reference">Booking Reference Number</label>
            <input
                type="text"
                name="update_booking_reference"
                id="update_booking_reference"
            />

            <label htmlFor="update_flight_number">Flight Number </label>
            <input
                type="text"
                name="update_flight_number"
                id="update_flight_number"
            />
            
            <label htmlFor="select_departure_airport">Select The Depature Airport </label>
            <select
                name="select_departure_airport"
                id="select_departure_airport"
            >
                <option value="">Select an Airport</option>
                {airports.map((airport) => (
                    <option key={airport.airportID} value={airport.airportID}>
                       {airport.airportName}
                    </option>
                ))}
            </select>

            <label htmlFor="select_departure_airport">Select The Arrival Airport </label>
            <select
                name="select_departure_airport"
                id="select_departure_airport"
            >
                <option value="">Select an Airport</option>
                {airports.map((airport) => (
                    <option key={airport.airportID} value={airport.airportID}>
                       {airport.airportName}
                    </option>
                ))}
            </select>
            
            <label htmlFor="update_depature_time">Depature Time </label>
            <input
                type="datetime-local"
                name="update_depature_time"
                id="update_depature_time"
            />
            
            <label htmlFor="update_arrival_time">Arrival Time </label>
            <input
                type="datetime-local"
                name="update_arrival_time"
                id="update_arrival_time"
            />
            
            <label htmlFor="update_cabin_class">Cabin Class </label>
            <input
                type="text"
                name="update_cabin_class"
                id="update_cabin_class"
            />
            
            <label htmlFor="update_notes">Notes </label>
            <input
                type="text"
                name="update_notes"
                id="update_notes"
            />


            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateFlight;