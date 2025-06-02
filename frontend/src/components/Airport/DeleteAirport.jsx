// Citation for code below
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

const DeleteAirport = ({ rowObject, backendURL, refreshAirport }) => {
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            delete_id: rowObject.airportID,
            delete_name: rowObject.airportName,
        };

        if (!window.confirm(`Are you sure you want to delete ${formData.delete_name}?`)) {
            return;
        }

        try {
            const response = await fetch (`${backendURL}/airports/delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Airport deleted successfully.');
                refreshAirport();
            } else {
                console.error('Error deleting airport.');
                if (response.status === 404 ) {
                    alert('Airport not found.');
                } else {
                    alert('Error deleting airport.');
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

export default DeleteAirport;
