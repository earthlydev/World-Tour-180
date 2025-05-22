const CreateFlight = ({ itineraries, airlines ,airports, backendURL, refreshFlight }) => {

    return (
        <>
        <h2>New Flight</h2>

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

            <label htmlFor="create_booking_reference">Booking Reference Number</label>
            <input
                type="text"
                name="create_booking_reference"
                id="create_booking_reference"
            />

            <label htmlFor="create_flight_number">Flight Number </label>
            <input
                type="text"
                name="create_flight_number"
                id="create_flight_number"
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
            
            {/* Update to input to be datetime */}
            <label htmlFor="create_depature_time">Depature Time </label>
            <input
                type="datetime-local"
                name="create_depature_time"
                id="create_depature_time"
            />
            
            <label htmlFor="create_arrival_time">Arrival Time </label>
            <input
                type="datetime-local"
                name="create_arrival_time"
                id="create_arrival_time"
            />
            
            <label htmlFor="create_cabin_class">Cabin Class </label>
            <input
                type="text"
                name="create_cabin_class"
                id="create_cabin_class"
            />
            
            <label htmlFor="create_notes">Notes </label>
            <input
                type="text"
                name="create_notes"
                id="create_notes"
            />


            <input type="submit" />
        </form>
        </>
    );
};

export default CreateFlight;
