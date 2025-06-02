// Citation for code below
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

const DeleteDestination = ({ rowObject, backendURL, refreshDestination }) => {
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            delete_id: rowObject.destinationID,
            delete_name: rowObject.name,
        };

        if (!window.confirm(`Are you sure you want to delete ${formData.delete_name}?`)) {
            return;
        }

        try {
            const response = await fetch (`${backendURL}/destinations/delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Destination deleted successfully.');
                refreshDestination();
            } else {
                console.error('Error deleting destination.');
                if (response.status === 404 ) {
                    alert('Destination not found.');
                } else {
                    alert('Error deleting destination.');
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

export default DeleteDestination;
