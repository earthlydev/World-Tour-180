const UpdateItinerary = ({ itineraries, customers, agents, backendURL, refreshItinerary }) => {

    return (
        <>
        <h2>Update an Itinerary</h2>

        <form className='cuForm'>
            <label htmlFor="update_itinerary_id">Itinerary to Update </label>
            <select
                name="update_itinerary_id"
                id="update_itinerary_id"
            >
                <option value="">Select an itinerary</option>
                {itineraries && itineraries.map((itinerary) => (
                    <option key={itinerary.itineraryID} value={itinerary.itineraryID}>
                       {itinerary.title}
                    </option>
                ))}
            </select>

            <label htmlFor="update_itinerary_title">Title </label>
            <input
                type="text"
                name="update_itinerary_title"
                id="update_itinerary_title"
                required
            />

            <label htmlFor="update_itinerary_customer">Customer </label>
            <select
                name="update_itinerary_customerID"
                id="update_itinerary_customerID"
                required
            >
                <option value="">Select a customer</option>
                {customers && customers.map((customer) => (
                    <option key={customer.customerID} value={customer.customerID}>
                        {customer.firstName} {customer.lastName}
                    </option>
                ))}
            </select>

            <label htmlFor="update_itinerary_agent">Agent </label>
            <select
                name="update_itinerary_agentID"
                id="update_itinerary_agentID"
                required
            >
                <option value="">Select an agent</option>
                {agents && agents.map((agent) => (
                    <option key={agent.agentID} value={agent.agentID}>
                        {agent.firstName} {agent.lastName}
                    </option>
                ))}
            </select>

            <label htmlFor="update_itinerary_startDate">Start Date </label>
            <input
                type="date"
                name="update_itinerary_startDate"
                id="update_itinerary_startDate"
                required
            />
            
            <label htmlFor="update_itinerary_endDate">End Date </label>
            <input
                type="date"
                name="update_itinerary_endDate"
                id="update_itinerary_endDate"
                required
            />

            <label htmlFor="update_itinerary_notes">Notes </label>
            <input
                type="text"
                name="update_itinerary_notes"
                id="update_itinerary_notes"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateItinerary;