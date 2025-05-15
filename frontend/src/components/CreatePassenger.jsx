const CreatePassenger = ({ backendURL, refreshPassenger, customers }) => {

    return (
        <>
        <h2>New Passenger</h2>

        <form className='cuForm'>
            <label htmlFor="create_passenger_customer">Customer </label>
            <select
                name="create_passenger_customerID"
                id="create_passenger_customerID"
                required
            >
                <option value="">Select a customer</option>
                {customers && customers.map((customer) => (
                    <option key={customer.customerID} value={customer.customerID}>
                        {customer.firstName} {customer.lastName}
                    </option>
                ))}
            </select>

            <label htmlFor="create_passenger_firstName">First Name </label>
            <input
                type="text"
                name="create_passenger_firstName"
                id="create_passenger_firstName"
                required
            />

            <label htmlFor="create_passenger_lastName">Last Name </label>
            <input
                type="text"
                name="create_passenger_lastName"
                id="create_passenger_lastName"
                required
            />

            <label htmlFor="create_passenger_email">Email </label>
            <input
                type="email"
                name="create_passenger_email"
                id="create_passenger_email"
                required
            />
            
            <label htmlFor="create_passenger_primaryPhone">Primary Phone </label>
            <input
                type="tel"
                name="create_passenger_primaryPhone"
                id="create_passenger_primaryPhone"
                required
            />

            <label htmlFor="create_passenger_secondaryPhone">Secondary Phone </label>
            <input
                type="tel"
                name="create_passenger_secondaryPhone"
                id="create_passenger_secondaryPhone"
            />

            <label htmlFor="create_passenger_passportExpiration">Passport Expiration </label>
            <input
                type="date"
                name="create_passenger_passportExpiration"
                id="create_passenger_passportExpiration"
                required
            />

            <label htmlFor="create_passenger_nationality">Nationality </label>
            <input
                type="text"
                name="create_passenger_nationality"
                id="create_passenger_nationality"
                required
            />
            
            <label htmlFor="create_passenger_dateOfBirth">Date of Birth </label>
            <input
                type="date"
                name="create_passenger_dateOfBirth"
                id="create_passenger_dateOfBirth"
                required
            />

            <label htmlFor="create_passenger_relationshipToCustomer">Relationship to Customer </label>
            <input
                type="text"
                name="create_passenger_relationshipToCustomer"
                id="create_passenger_relationshipToCustomer"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreatePassenger;