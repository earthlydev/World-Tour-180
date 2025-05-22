// Citation for code below
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

const DeleteAgent = ({ rowObject, backendURL, refreshAgent }) => {
    const fullname = rowObject.firstName + ' ' + rowObject.lastName;

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = {
            delete_agent_id: rowObject.agentID,
            delete_agent_name: fullname,
        };

        try {
            const response = await fetch(backendURL + '/agents/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Person deleted successfully.");
                refreshAgent();
            } else {
                console.error("Error deleting agent.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };
    return (
        <td>
            <form>
                <button type='submit'>
                    Delete
                </button>
            </form>
        </td>
    );
};

export default DeleteAgent;