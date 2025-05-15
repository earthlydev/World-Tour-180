import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import CreateAirport from '../components/CreateAirport';
import UpdateAirport from '../components/UpdateAirport';

function Airports({ backendURL }) {
    const [airports, setAirports] = useState([]);


    const getData = async function () {
        try {
            const response = await fetch(backendURL + '/airports');
            
            const {airports} = await response.json();
    
            setAirports(airports);

        } catch (error) {
          console.log(error);
        }

    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Airports</h1>

            <table>
                <thead>
                    <tr>
                        {airports.length > 0 && [
                            <th key="airportID">Aiport ID</th>,
                            <th key="airportName">Name</th>,
                            <th key="iataCode">IATA Code</th>,
                            <th key="city">City</th>,
                            <th key="country">Country</th>,
                            <th key="timezone">timezone</th>

                        ]}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {airports.map((airport, index) => (
                        <TableRow key={index} rowObject={airport} backendURL={backendURL} refreshAirports={getData}/>
                    ))}

                </tbody>
            </table>
            
            <CreateAirport backendURL={backendURL} refreshAirport={getData} />
            <UpdateAirport airports={airports} backendURL={backendURL} refreshAirport={getData} />    
        </>
    );

} 

export default Airports;
