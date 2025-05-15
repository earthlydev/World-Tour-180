const UpdateAirline = ({ airlines, backendURL, refreshAirlines }) => {

    return (
        <>
        <h2>Update an Airline</h2>

        <form className='cuForm'>
            <label htmlFor="update_airline_name">Airline to Update </label>
            <select
                name="update_airline_id"
                id="update_airline_id"
            >
                <option value="">Select an airline</option>
                {airlines.map((airline) => (
                    <option key={airline.id} value={airline.id}>
                       {airline.airlineName}
                    </option>
                ))}
            </select>

            <label htmlFor="update_airline_name"> Name </label>
            <input
                type="text"
                name="update_airline_name"
                id="update_airline_name"
            />
            
            <label htmlFor="update_airline_website">Website </label>
            <input
                type="text"
                name="update_airline_website"
                id="update_airline_website"
            />

            <label htmlFor="update_airline_Phone">Phone </label>
            <input
                type="text"
                name="update_airline_Phone"
                id="update_airline_Phone"
            />
        <input type="submit" />
        </form>
        </>
    );
}; 

export default UpdateAirline; 