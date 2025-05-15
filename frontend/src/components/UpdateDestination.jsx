const UpdateDestination = ({ destinations, backendURL, refreshDestination }) => {

    return (
        <>
        <h2>Update a Destination</h2>
        <form className='cuForm'>
            <label htmlFor="update_destination_id">Destination to Update </label>
            <select
                name="update_destination_id"
                id="update_destination_id"
            >
                <option value="">Select a destination</option>
                {destinations.map((destination) => (
                    <option key={destination.id} value={destination.id}>
                       {destination.name}
                    </option>
                ))}
            </select>

            <label htmlFor="update_destination_name">Name </label>
            <input
                type="text"
                name="update_destination_name"
                id="update_destination_name"
            />

            <label htmlFor="update_destination_country">Country </label>
            <input
                type="text"
                name="update_destination_country"
                id="update_destination_country"
            />

<label htmlFor="update_destination_timezone">Timezone </label>
            <input
                type="text"
                name="update_destination_timezone"
                id="update_destination_timezone"
            />
            
            <label>Visa Required</label>
            <input
                type="radio"
                id="visaYes"
                name="update_destination_visaRequired"
                value="true"
            />
            <label htmlFor="visaYes">Yes </label>
            <input
                type="radio"
                id="visaNo"
                name="update_destination_visaRequired"
                value="false"
            />
            <label htmlFor="visaNo">No </label>
                
            

            <label htmlFor="update_destination_currency">Currency </label>
            <input
                type="text"
                name="update_destination_currency"
                id="update_destination_currency"
            />

            <label htmlFor="update_destination_language">Language </label>
            <input
                type="text"
                name="update_destination_language"
                id="update_destination_language"
            />
            
            <label htmlFor="update_destination_description">Description </label>
            <input
                type="text"
                name="update_destination_description"
                id="update_destination_description"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateDestination;
