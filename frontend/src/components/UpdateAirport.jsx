const UpdateAirport = ({ airports, backendURL, refreshAirport }) => {

    return (
        <>
        <h2>Update an Airport</h2>

        <form className='cuForm'>
            <label htmlFor="update_airport_name">Airport to Update </label>
            <select
                name="update_airport_id"
                id="update_airport_id"
            >
                <option value="">Select an airport</option>
                {airports.map((airport) => (
                    <option key={airport.id} value={airport.id}>
                       {airport.airportName}
                    </option>
                ))}
            </select>
            
            <label htmlFor="update_airport_name"> Name </label>
            <input
                type="text"
                name="update_airport_name"
                id="update_airport_name"
            />
            
            <label htmlFor="iata">IATA Code </label>
            <input
                type="text"
                name="update_airport_iata"
                id="update_airport_iata"
            />

            <label htmlFor="update_airport_city">City </label>
            <input
                type="text"
                name="update_airport_city"
                id="update_airport_city"
            />

<label htmlFor="update_airport_country">Country </label>
            <input
                type="text"
                name="update_airport_country"
                id="update_airport_country"
            />
            
            <label htmlFor="update_airport_timezone">Timezone </label>
            <input
                type="text"
                name="update_airport_timezone"
                id="update_airport_timezone"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateAirport;
