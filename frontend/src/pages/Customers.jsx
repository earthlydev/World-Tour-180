import { useState, useEffect } from 'react';
import CreateCustomer from '../components/CreateCustomer';
import UpdateCustomer from '../components/UpdateCustomer';
import CustomerTableRow from '../components/CustomerTablerRow';

function Customers({ backendURL }) {
    // Set up state variables to store and display the backend response
    const [customers, setCustomers] = useState([]);

    // Helper function to format dates consistently
    function formatDate(dateString) {
        if (!dateString) return null;
        return new Date(dateString).toISOString().split('T')[0];
    }

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/customers');
            
            // Convert the response into JSON format
            const {customers} = await response.json();
    
            // Format date fields in customers data
            const formattedCustomers = customers.map(customer => ({
                ...customer,
                passportExpiration: formatDate(customer.passportExpiration),
                dateOfBirth: formatDate(customer.dateOfBirth)
            }));

            // Update the customers state with the formatted data
            setCustomers(formattedCustomers);
            
        } catch (error) {
          // If the API call fails, print the error to the console
          console.log(error);
        }
    };

    // Load table on page load
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Customers</h1>

            <table>
                <thead>
                    <tr>
                        {customers.length > 0 && Object.keys(customers[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {customers.map((customer, index) => (
                        <CustomerTableRow key={index} rowObject={customer} backendURL={backendURL} refreshCustomer={getData} />
                    ))}
                </tbody>
            </table>
            
            <CreateCustomer backendURL={backendURL} refreshCustomer={getData} />
            <UpdateCustomer customers={customers} backendURL={backendURL} refreshCustomer={getData} />               
        </>
    );
} 

export default Customers;