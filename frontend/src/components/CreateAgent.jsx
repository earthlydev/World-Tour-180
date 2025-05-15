const CreateAgent = ({ backendURL, refreshAgent }) => {

    return (
        <>
        <h2>New Agent</h2>

        <form className='cuForm'>
            <label htmlFor="create_agent_firstName">First Name </label>
            <input
                type="text"
                name="create_agent_firstName"
                id="create_agent_firstName"
                required
            />

            <label htmlFor="create_agent_lastName">Last Name </label>
            <input
                type="text"
                name="create_agent_lastName"
                id="create_agent_lastName"
                required
            />

            <label htmlFor="create_agent_email">Email </label>
            <input
                type="email"
                name="create_agent_email"
                id="create_agent_email"
                required
            />
            
            <label htmlFor="create_agent_primaryPhone">Primary Phone </label>
            <input
                type="tel"
                name="create_agent_primaryPhone"
                id="create_agent_primaryPhone"
                required
            />

            <label htmlFor="create_agent_secondaryPhone">Secondary Phone </label>
            <input
                type="tel"
                name="create_agent_secondaryPhone"
                id="create_agent_secondaryPhone"
            />

            <label htmlFor="create_agent_specialization">Specialization </label>
            <input
                type="text"
                name="create_agent_specialization"
                id="create_agent_specialization"
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default CreateAgent;