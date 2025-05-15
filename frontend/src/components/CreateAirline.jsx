const CreateAirline = ({ backendURL }) => {

    return (
        <>
        <h2>New Airline</h2>

        <form className='cuForm'>
        <label htmlFor="create_airline_name">Name </label>
            <input
                type="text"
                name="create_airline_name"
                id="create_airline_name"
            />
        
        <label htmlFor="create_airline_website">Website </label>
            <input
                type="text"
                name="create_airline_website"
                id="create_airline_website"
            />
        <label htmlFor="create_airline_phone">Phone </label>
            <input
                type="text"
                name="create_airline_phone"
                id="create_airline_phone"
            />
        <input type="submit" />
        </form>

        </>
    );
}; 

export default CreateAirline; 