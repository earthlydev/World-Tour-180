const UpdateFlight = ({ flights, backendURL, refreshFlight }) => {
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
            
            {/* Update to select from updated airports */}
            <label htmlFor="update_depature_airport">Departure Airport </label>
            <input
                type="text"
                name="update_depature_airport"
                id="update_depature_airport"
            />

            <label htmlFor="update_arrival_airport">Arrival Airport </label>
            <input
                type="text"
                name="update_arrival_airport"
                id="update_arrival_airport"
            />
            
            {/* Update to input to be datetime */}
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