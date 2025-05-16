import { useState, useEffect } from 'react';
import CreateCustomer from '../components/CreateCustomer';
import UpdateCustomer from '../components/UpdateCustomer';
 
function Customers({ backendURL }) {
    // Set up state variables
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
 
    // Fetch customers data
    const getData = async function () {
        setLoading(true);
        try {
            const response = await fetch(backendURL + '/customers');
            
            if (response.ok) {
                const { customers } = await response.json();
                setCustomers(customers);
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            setLoading(false);
        }
    };
 
    // Handle customer deletion
    const handleDeleteCustomer = async (customerID) => {
        if (window.confirm('Are you sure you want to delete this customer? This will also delete all related records.')) {
            try {
                const response = await fetch(`${backendURL}/customers/${customerID}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    getData();
                }
            } catch (error) {
                console.error("Error deleting customer:", error);
            }
        }
    };
 
    // Load data on component mount
    useEffect(() => {
        getData();
    }, []);
 
    // Render loading state
    if (loading && customers.length === 0) {
        return <div className="container">Loading customers...</div>;
    }
 
    return (
        <div className="container">
            <h1>Customers</h1>
 
            {customers.length === 0 ? (
                <p>No customers found. Add a new customer to get started.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Primary Phone</th>
                            <th>Secondary Phone</th>
                            <th>Passport Expiration</th>
                            <th>Nationality</th>
                            <th>Date of Birth</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
 
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.customerID}>
                                <td>{customer.customerID}</td>
                                <td>{customer.firstName}</td>
                                <td>{customer.lastName}</td>
                                <td>{customer.email}</td>
                                <td>{customer.primaryPhone}</td>
                                <td>{customer.secondaryPhone || 'N/A'}</td>
                                <td>{customer.passportExpiration}</td>
                                <td>{customer.nationality}</td>
                                <td>{customer.dateOfBirth}</td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteCustomer(customer.customerID)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            
            <CreateCustomer backendURL={backendURL} refreshCustomer={getData} />
            <UpdateCustomer customers={customers} backendURL={backendURL} refreshCustomer={getData} />               
        </div>
    );
}
 
export default Customers;