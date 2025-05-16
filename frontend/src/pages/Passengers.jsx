import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';
import CreatePassenger from '../components/CreatePassenger';
import UpdatePassenger from '../components/UpdatePassenger';

function Passengers({ backendURL }) {
    // Set up state variables to store and display the backend response
    const [passengers, setPassengers] = useState([]);
    const [customers, setCustomers] = useState([]);

    // Helper function to format dates consistently (same as server.js)
    function formatDate(dateString) {
        if (!dateString) return null;
        return new Date(dateString).toISOString().split('T')[0];
    }

    const getData = async function () {
        try {
            // Make GET requests to the backend
            const passengersResponse = await fetch(backendURL + '/passengers');
            const customersResponse = await fetch(backendURL + '/customers');
            
            // Convert the responses into JSON format
            const {passengers} = await passengersResponse.json();
            const {customers} = await customersResponse.json();
    
            // Format date fields in passengers data
            const formattedPassengers = passengers.map(passenger => ({
                ...passenger,
                passportExpiration: formatDate(passenger.passportExpiration),
                dateOfBirth: formatDate(passenger.dateOfBirth)
            }));

            // Update state with the formatted data
            setPassengers(formattedPassengers);
            setCustomers(customers);
            
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
            <h1>Passengers</h1>

            <table>
                <thead>
                    <tr>
                        {passengers.length > 0 && Object.keys(passengers[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {passengers.map((passenger, index) => (
                        <TableRow key={index} rowObject={passenger} backendURL={backendURL} refreshDestination={getData} />
                    ))}
                </tbody>
            </table>
            
            <CreatePassenger backendURL={backendURL} refreshPassenger={getData} customers={customers} />
            <UpdatePassenger passengers={passengers} customers={customers} backendURL={backendURL} refreshPassenger={getData} />               
        </>
    );
} 

export default Passengers;
