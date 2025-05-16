const CreateFlight = ({ backendURL, refreshFlight }) => {

    return (
        <>
        <h2>New Flight</h2>

        <form className='cuForm'>
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
            
            {/* Update to select from created airports */}
            <label htmlFor="create_depature_airport">Departure Airport </label>
            <input
                type="text"
                name="create_depature_airport"
                id="create_depature_airport"
            />

            <label htmlFor="create_arrival_airport">Arrival Airport </label>
            <input
                type="text"
                name="create_arrival_airport"
                id="create_arrival_airport"
            />
            
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
