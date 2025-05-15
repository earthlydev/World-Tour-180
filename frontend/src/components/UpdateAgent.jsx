const UpdateAgent = ({ agents, backendURL, refreshAgent }) => {

    return (
        <>
        <h2>Update an Agent</h2>

        <form className='cuForm'>
            <label htmlFor="update_agent_id">Agent to Update </label>
            <select
                name="update_agent_id"
                id="update_agent_id"
            >
                <option value="">Select an agent</option>
                {agents && agents.map((agent) => (
                    <option key={agent.agentID} value={agent.agentID}>
                       {agent.firstName} {agent.lastName}
                    </option>
                ))}
            </select>

            <label htmlFor="update_agent_firstName">First Name </label>
            <input
                type="text"
                name="update_agent_firstName"
                id="update_agent_firstName"
                required
            />

            <label htmlFor="update_agent_lastName">Last Name </label>
            <input
                type="text"
                name="update_agent_lastName"
                id="update_agent_lastName"
                required
            />

            <label htmlFor="update_agent_email">Email </label>
            <input
                type="email"
                name="update_agent_email"
                id="update_agent_email"
                required
            />
            
            <label htmlFor="update_agent_primaryPhone">Primary Phone </label>
            <input
                type="tel"
                name="update_agent_primaryPhone"
                id="update_agent_primaryPhone"
                required
            />

            <label htmlFor="update_agent_secondaryPhone">Secondary Phone </label>
            <input
                type="tel"
                name="update_agent_secondaryPhone"
                id="update_agent_secondaryPhone"
            />

            <label htmlFor="update_agent_specialization">Specialization </label>
            <input
                type="text"
                name="update_agent_specialization"
                id="update_agent_specialization"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateAgent;