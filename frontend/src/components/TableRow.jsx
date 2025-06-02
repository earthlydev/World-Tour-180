import DeleteDestination from "./Destination/DeleteDestination";

const TableRow = ({ rowObject, backendURL, refreshDestination }) => {
    // Function to determine if this row is a customer
    const isCustomer = rowObject && 'customerID' in rowObject && !('passengerID' in rowObject);

    // Function to handle delete operation for a customer
    const handleDeleteCustomer = async () => {
        if (!isCustomer) return;
        
        if (!window.confirm(`Are you sure you want to delete customer: ${rowObject.firstName} ${rowObject.lastName}?`)) {
            return;
        }
        
        try {
            const response = await fetch(`${backendURL}/customers/${rowObject.customerID}`, {
                method: 'DELETE',
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete customer');
            }
            
            alert('Customer deleted successfully. Use RESET to restore the database.');
            
            // Refresh the data
            if (refreshDestination && typeof refreshDestination === 'function') {
                refreshDestination();
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <tr>
            {Object.values(rowObject).map((value, index) => (
                <td key={index}>{value !== null ? value.toString() : 'NULL'}</td>
            ))}
            
            <td>
                {/* Show the DeleteDestination component for non-Customer rows */}
                {!isCustomer && (
                    <DeleteDestination 
                        rowObject={rowObject} 
                        backendURL={backendURL} 
                        refreshDestination={refreshDestination} 
                    />
                )}
                
                {/* Show the Delete button for Customer rows */}
                {isCustomer && (
                    <button 
                        onClick={handleDeleteCustomer}
                        style={{
                            backgroundColor: '#ff3b30',
                            color: 'white',
                            padding: '4px 8px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Delete
                    </button>
                )}
            </td>
        </tr>
    );
};

export default TableRow;