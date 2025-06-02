// Citation for code below
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

const DeleteItiDes = ({ rowObject, backendURL, refreshItiDes }) => {
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            delete_id: rowObject.idID,
        };

        if (!window.confirm(`Are you sure you want to delete ID: ${formData.delete_id}? - ${rowObject.title}`)) {
            return;
        }

        try {
            const response = await fetch (`${backendURL}/itinerarydestinations/delete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('ItiDes deleted successfully.');
                refreshItiDes();
            } else {
                console.error('Error deleting itineraryDestination.');
                if (response.status === 404 ) {
                    alert('Itinerary Destination not found.');
                } else {
                    alert('Error deleting itineraryDestination.');
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

export default DeleteItiDes;
