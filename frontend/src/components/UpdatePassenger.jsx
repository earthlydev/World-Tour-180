const UpdatePassenger = ({ passengers, customers, backendURL, refreshPassenger }) => {

    return (
        <>
        <h2>Update a Passenger</h2>

        <form className='cuForm'>
            <label htmlFor="update_passenger_id">Passenger to Update </label>
            <select
                name="update_passenger_id"
                id="update_passenger_id"
            >
                <option value="">Select a passenger</option>
                {passengers && passengers.map((passenger) => (
                    <option key={passenger.passengerID} value={passenger.passengerID}>
                       {passenger.firstName} {passenger.lastName}
                    </option>
                ))}
            </select>

            <label htmlFor="update_passenger_customer">Customer </label>
            <select
                name="update_passenger_customerID"
                id="update_passenger_customerID"
                required
            >
                <option value="">Select a customer</option>
                {customers && customers.map((customer) => (
                    <option key={customer.customerID} value={customer.customerID}>
                        {customer.firstName} {customer.lastName}
                    </option>
                ))}
            </select>

            <label htmlFor="update_passenger_firstName">First Name </label>
            <input
                type="text"
                name="update_passenger_firstName"
                id="update_passenger_firstName"
                required
            />

            <label htmlFor="update_passenger_lastName">Last Name </label>
            <input
                type="text"
                name="update_passenger_lastName"
                id="update_passenger_lastName"
                required
            />

            <label htmlFor="update_passenger_email">Email </label>
            <input
                type="email"
                name="update_passenger_email"
                id="update_passenger_email"
                required
            />
            
            <label htmlFor="update_passenger_primaryPhone">Primary Phone </label>
            <input
                type="tel"
                name="update_passenger_primaryPhone"
                id="update_passenger_primaryPhone"
                required
            />

            <label htmlFor="update_passenger_secondaryPhone">Secondary Phone </label>
            <input
                type="tel"
                name="update_passenger_secondaryPhone"
                id="update_passenger_secondaryPhone"
            />

            <label htmlFor="update_passenger_passportExpiration">Passport Expiration </label>
            <input
                type="date"
                name="update_passenger_passportExpiration"
                id="update_passenger_passportExpiration"
                required
            />

            <label htmlFor="update_passenger_nationality">Nationality </label>
            <input
                type="text"
                name="update_passenger_nationality"
                id="update_passenger_nationality"
                required
            />
            
            <label htmlFor="update_passenger_dateOfBirth">Date of Birth </label>
            <input
                type="date"
                name="update_passenger_dateOfBirth"
                id="update_passenger_dateOfBirth"
                required
            />

            <label htmlFor="update_passenger_relationshipToCustomer">Relationship to Customer </label>
            <input
                type="text"
                name="update_passenger_relationshipToCustomer"
                id="update_passenger_relationshipToCustomer"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdatePassenger;