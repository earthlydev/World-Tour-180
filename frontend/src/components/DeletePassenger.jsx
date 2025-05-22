const DeletePassenger = ({ rowObject, backendURL, refreshPassenger }) => {
    const fullname = rowObject.firstName + ' ' + rowObject.lastName;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            delete_passenger_id: rowObject.passengerID,
            delete_passenger_name: fullname,
        };

        try {
            const response = await fetch(backendURL + '/passengers/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Person deleted successfully.");
                refreshPassenger();
            } else {
                console.error("Error deleting passenger.");
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

export default DeletePassenger;