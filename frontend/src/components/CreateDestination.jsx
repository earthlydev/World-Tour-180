const CreateDestination = ({ backendURL, refreshDestination }) => {

    return (
        <>
        <h2>New Destination</h2>

        <form className='cuForm'>
            <label htmlFor="create_destination_name">Name </label>
            <input
                type="text"
                name="create_destination_name"
                id="create_destination_name"
            />

            <label htmlFor="create_destination_country">Country </label>
            <input
                type="text"
                name="create_destination_country"
                id="create_destination_country"
            />

            <label htmlFor="create_destination_timezone">Timezone </label>
            <input
                type="text"
                name="create_destination_timezone"
                id="create_destination_timezone"
            />
            
            <label>Visa Required</label>
            <input
                type="radio"
                id="visaYes"
                name="create_destination_visaRequired"
                value="true"
            />
            <label htmlFor="visaYes">Yes </label>
            <input
                type="radio"
                id="visaNo"
                name="create_destination_visaRequired"
                value="false"
            />
            <label htmlFor="visaNo">No </label>

            <label htmlFor="create_destination_currency">Currency </label>
            <input
                type="text"
                name="create_destination_currency"
                id="create_destination_currency"
            />

            <label htmlFor="create_destination_language">Language </label>
            <input
                type="text"
                name="create_destination_language"
                id="create_destination_language"
            />
            
            <label htmlFor="create_destination_description">Description </label>
            <input
                type="text"
                name="create_destination_description"
                id="create_destination_description"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateDestination;
