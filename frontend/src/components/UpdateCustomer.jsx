const UpdateCustomer = ({ customers, backendURL, refreshCustomer }) => {

    return (
        <>
        <h2>Update a Customer</h2>

        <form className='cuForm'>
            <label htmlFor="update_customer_id">Customer to Update </label>
            <select
                name="update_customer_id"
                id="update_customer_id"
            >
                <option value="">Select a customer</option>
                {customers.map((customer) => (
                    <option key={customer.customerID} value={customer.customerID}>
                       {customer.firstName} {customer.lastName}
                    </option>
                ))}
            </select>

            <label htmlFor="update_customer_firstName">First Name </label>
            <input
                type="text"
                name="update_customer_firstName"
                id="update_customer_firstName"
                required
            />

            <label htmlFor="update_customer_lastName">Last Name </label>
            <input
                type="text"
                name="update_customer_lastName"
                id="update_customer_lastName"
                required
            />

            <label htmlFor="update_customer_email">Email </label>
            <input
                type="email"
                name="update_customer_email"
                id="update_customer_email"
                required
            />
            
            <label htmlFor="update_customer_primaryPhone">Primary Phone </label>
            <input
                type="tel"
                name="update_customer_primaryPhone"
                id="update_customer_primaryPhone"
                required
            />

            <label htmlFor="update_customer_secondaryPhone">Secondary Phone </label>
            <input
                type="tel"
                name="update_customer_secondaryPhone"
                id="update_customer_secondaryPhone"
            />

            <label htmlFor="update_customer_passportExpiration">Passport Expiration </label>
            <input
                type="date"
                name="update_customer_passportExpiration"
                id="update_customer_passportExpiration"
                required
            />

            <label htmlFor="update_customer_nationality">Nationality </label>
            <input
                type="text"
                name="update_customer_nationality"
                id="update_customer_nationality"
                required
            />
            
            <label htmlFor="update_customer_dateOfBirth">Date of Birth </label>
            <input
                type="date"
                name="update_customer_dateOfBirth"
                id="update_customer_dateOfBirth"
                required
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateCustomer;