const DeleteFlight = ({ rowObject, backendURL, refreshFlight }) => {
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            delete_id: rowObject.flightID,
            delete_name: rowObject.bookingReferenceNum,
        };

        if (!window.confirm(`Are you sure you want to delete ${formData.delete_name}?`)) {
            return;
        }

        try {
            const response = await fetch (`${backendURL}/flights/delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Flight deleted successfully.');
                refreshFlight();
            } else {
                console.error('Error deleting flight.');
                if (response.status === 404 ) {
                    alert('Flight not found.');
                } else {
                    alert('Error deleting flight.');
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

export default DeleteFlight;
