const CreateItinerary = ({ backendURL, refreshItinerary, customers, agents }) => {

    return (
        <>
        <h2>New Itinerary</h2>

        <form className='cuForm'>
            <label htmlFor="create_itinerary_title">Title </label>
            <input
                type="text"
                name="create_itinerary_title"
                id="create_itinerary_title"
                required
            />

            <label htmlFor="create_itinerary_customer">Customer </label>
            <select
                name="create_itinerary_customerID"
                id="create_itinerary_customerID"
                required
            >
                <option value="">Select a customer</option>
                {customers && customers.map((customer) => (
                    <option key={customer.customerID} value={customer.customerID}>
                        {customer.firstName} {customer.lastName}
                    </option>
                ))}
            </select>

            <label htmlFor="create_itinerary_agent">Agent </label>
            <select
                name="create_itinerary_agentID"
                id="create_itinerary_agentID"
                required
            >
                <option value="">Select an agent</option>
                {agents && agents.map((agent) => (
                    <option key={agent.agentID} value={agent.agentID}>
                        {agent.firstName} {agent.lastName}
                    </option>
                ))}
            </select>

            <label htmlFor="create_itinerary_startDate">Start Date </label>
            <input
                type="date"
                name="create_itinerary_startDate"
                id="create_itinerary_startDate"
                required
            />
            
            <label htmlFor="create_itinerary_endDate">End Date </label>
            <input
                type="date"
                name="create_itinerary_endDate"
                id="create_itinerary_endDate"
                required
            />

            <label htmlFor="create_itinerary_notes">Notes </label>
            <input
                type="text"
                name="create_itinerary_notes"
                id="create_itinerary_notes"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateItinerary;