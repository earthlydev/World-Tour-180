// Citation for code below
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

const DeleteAirline = ({ rowObject, backendURL, refreshAirline }) => {
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            delete_id: rowObject.airlineID,
            delete_name: rowObject.airlineName,
        };

        if (!window.confirm(`Are you sure you want to delete ${formData.delete_name}?`)) {
            return;
        }

        try {
            const response = await fetch (`${backendURL}/airlines/delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Airline deleted successfully.');
                refreshAirline();
            } else {
                console.error('Error deleting airline.');
                if (response.status === 404 ) {
                    alert('Airline not found.');
                } else {
                    alert('Error deleting airline.');
                }
            }
        } catch (error) {
            console.error('Error during deletion:', error);
            alert('Network error during deletion');
        }
    };

    return (
        <td>
            <form onSubmit={handleSubmit}>
                <button type='submit'>
                    Delete
                </button>
            </form>
        </td>

    );
};

export default DeleteAirline;
