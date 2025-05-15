import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';
import CreateAgent from '../components/CreateAgent';
import UpdateAgent from '../components/UpdateAgent';

function Agents({ backendURL }) {
    // Set up state variables to store and display the backend response
    const [agents, setAgents] = useState([]);

    const getData = async function () {
        try {
            // Make a GET request to the backend
            const response = await fetch(backendURL + '/agents');
            
            // Convert the response into JSON format
            const {agents} = await response.json();
    
            // Update the agents state with the response data
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
            <h1>Agents</h1>

            <table>
                <thead>
                    <tr>
                        {agents.length > 0 && Object.keys(agents[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {agents.map((agent, index) => (
                        <TableRow key={index} rowObject={agent} backendURL={backendURL} refreshDestination={getData} />
                    ))}
                </tbody>
            </table>
            
            <CreateAgent backendURL={backendURL} refreshAgent={getData} />
            <UpdateAgent agents={agents} backendURL={backendURL} refreshAgent={getData} />               
        </>
    );
} 

export default Agents;