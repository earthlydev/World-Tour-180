// Citation for code below
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25352968

const DeleteCustomer = ({ rowObject, backendURL, refreshCustomer }) => {
    const fullname = rowObject.firstName + ' ' + rowObject.lastName;

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const formData = {
            delete_customer_id: rowObject.customerID,
            delete_customer_name: fullname,
        };

        try {
            const response = await fetch(backendURL + '/customers/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Customer deleted successfully.");
                refreshCustomer();
            } else {
                console.error("Error deleting customer.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
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