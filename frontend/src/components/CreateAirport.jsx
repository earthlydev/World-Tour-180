const CreateAirport = ({ backendURL, refreshAirport }) => {

    return (
        <>
        <h2>New Airport</h2>

        <form className='cuForm'>
            <label htmlFor="create_airport_name">Name </label>
            <input
                type="text"
                name="create_airport_name"
                id="create_airport_name"
            />

            <label htmlFor="iata">IATA </label>
            <input
                type="text"
                name="create_airport_iata"
                id="create_airport_iata"
            />

            <label htmlFor="create_airport_city">City </label>
            <input
                type="text"
                name="create_airport_city"
                id="create_airport_city"
            />

<label htmlFor="create_airport_country">Country </label>
            <input
                type="text"
                name="create_airport_country"
                id="create_airport_country"
            />
            
            <label htmlFor="create_airport_timezone">Timezone </label>
            <input
                type="text"
                name="create_airport_timezone"
                id="create_airport_timezone"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateAirport;
