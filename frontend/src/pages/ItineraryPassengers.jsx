import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';

function ItineraryPassengers({ backendURL }) {
    const [itinerarypassengers, setItineraryPassengers] = useState([]);


    const getData = async function () {
        try {
            const response = await fetch(backendURL + '/itinerarypassengers');

            const {itinerarypassengers} = await response.json();
    
            setItineraryPassengers(itinerarypassengers);

        } catch (error) {
          console.log(error);
        }

    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Itinerary Passengers</h1>

            <table>
                <thead>
                    <tr>
                        {itinerarypassengers.length > 0 && Object.keys(itinerarypassengers[0]).map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                
                <tbody>
                    {itinerarypassengers.map((itinerarypassenger, index) => (
                        <TableRow key={index} rowObject={itinerarypassenger} backendURL={backendURL} refreshDestination={getData}/>
                    ))}

                </tbody>
            </table>
                         
        </>
    );
}

export default ItineraryPassengers;