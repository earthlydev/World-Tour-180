// Citation for code below
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

const DeleteCustomer = ({ rowObject, backendURL, refreshCustomer }) => {
    const fullname = rowObject.firstName + ' ' + rowObject.lastName;

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!window.confirm(`Are you sure you want to delete ${fullname}?`)) {
            return;
        } 

        try {
            const response = await fetch(`${backendURL}/customers/${rowObject.customerID}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log("Customer deleted successfully.");
                refreshCustomer();
            } else {
                console.error("Error deleting customer.");
                if (response.status === 404) {
                    alert('Customer not found');
                } else {
                    alert('Error deleting customer');
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

export default DeleteCustomer;