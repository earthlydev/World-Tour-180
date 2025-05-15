const CreateCustomer = ({ backendURL, refreshCustomer }) => {

    return (
        <>
        <h2>New Customer</h2>

        <form className='cuForm'>
            <label htmlFor="create_customer_firstName">First Name </label>
            <input
                type="text"
                name="create_customer_firstName"
                id="create_customer_firstName"
                required
            />

            <label htmlFor="create_customer_lastName">Last Name </label>
            <input
                type="text"
                name="create_customer_lastName"
                id="create_customer_lastName"
                required
            />

            <label htmlFor="create_customer_email">Email </label>
            <input
                type="email"
                name="create_customer_email"
                id="create_customer_email"
                required
            />
            
            <label htmlFor="create_customer_primaryPhone">Primary Phone </label>
            <input
                type="tel"
                name="create_customer_primaryPhone"
                id="create_customer_primaryPhone"
                required
            />

            <label htmlFor="create_customer_secondaryPhone">Secondary Phone </label>
            <input
                type="tel"
                name="create_customer_secondaryPhone"
                id="create_customer_secondaryPhone"
            />

            <label htmlFor="create_customer_passportExpiration">Passport Expiration </label>
            <input
                type="date"
                name="create_customer_passportExpiration"
                id="create_customer_passportExpiration"
                required
            />

            <label htmlFor="create_customer_nationality">Nationality </label>
            <input
                type="text"
                name="create_customer_nationality"
                id="create_customer_nationality"
                required
            />
            
            <label htmlFor="create_customer_dateOfBirth">Date of Birth </label>
            <input
                type="date"
                name="create_customer_dateOfBirth"
                id="create_customer_dateOfBirth"
                required
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateCustomer;