import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';
import CreateItinerary from '../components/CreateItinerary';
import UpdateItinerary from '../components/UpdateItinerary';

function Itineraries({ backendURL }) {
    // Set up state variables to store and display the backend response
    const [itineraries, setItineraries] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [agents, setAgents] = useState([]);

    const getData = async function () {
        try {
            // Make GET requests to the backend
            const itinerariesResponse = await fetch(backendURL + '/itineraries');
            const customersResponse = await fetch(backendURL + '/customers');
            const agentsResponse = await fetch(backendURL + '/agents');
            
            // Convert the responses into JSON format
            const {itineraries} = await itinerariesResponse.json();
            const {customers} = await customersResponse.json();
            const {agents} = await agentsResponse.json();
    
            // Update state with the response data
            setItineraries(itineraries);
            setCustomers(customers);
            setAgents(agents);
            
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
            <h1>Itineraries</h1>

            <table>
                <thead>
                    <tr>
                        {itineraries.length > 0 && Object.keys(itineraries[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {itineraries.map((itinerary, index) => (
                        <TableRow key={index} rowObject={itinerary} backendURL={backendURL} refreshDestination={getData} />
                    ))}
                </tbody>
            </table>
            
            <CreateItinerary 
                backendURL={backendURL} 
                refreshItinerary={getData} 
                customers={customers}
                agents={agents}
            />
            <UpdateItinerary 
                itineraries={itineraries} 
                customers={customers}
                agents={agents}
                backendURL={backendURL} 
                refreshItinerary={getData} 
            />               
        </>
    );
} 

export default Itineraries;