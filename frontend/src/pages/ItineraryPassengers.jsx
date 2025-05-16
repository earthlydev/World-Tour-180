
import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import LinkItiPas from '../components/LinkItiPas';
import UpdateItiPas from '../components/UpdateItiPas';

function ItineraryPassengers({ backendURL }) {
    const [itinerarypassengers, setItineraryPassengers] = useState([]);
    const [itineraries, setItineraries] = useState([]);
    const [passengers, setPassengers] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    
    const getData = async function () {
        try {
            const response = await fetch(backendURL + '/itinerarypassengers');
            const itiRes = await fetch(backendURL + '/itineraries');
            const pasRes = await fetch(backendURL + '/passengers');
            
            const {itinerarypassengers} = await response.json();
            const { itineraries } = await itiRes.json();
            const { passengers } = await pasRes.json();

            setItineraryPassengers(itinerarypassengers);
            setItineraries(itineraries);
            setPassengers(passengers);

            // Create lookup objects and combine data
            const itineraryMap = {};
            itineraries.forEach(it => {
                itineraryMap[it.itineraryID] = it;
            });

            const passengerMap = {};
            passengers.forEach(pas => {
                passengerMap[pas.passengerID] = pas;
            });

            const enrichedData = itinerarypassengers.map(item => ({
                ...item,
                itineraryTitle: itineraryMap[item.itineraryID]?.title || 'Unknown',
                passengerName: passengerMap[item.passengerID] ? 
                    `${passengerMap[item.passengerID].firstName} ${passengerMap[item.passengerID].lastName}` : 
                    'Unknown'
            }));

            setCombinedData(enrichedData);
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
                        {combinedData.length > 0 && [
                            <th key="ipID">Itinerary Passengers ID</th>,
                            <th key="itineraryID">Itinerary ID</th>,
                            <th key="passengerID">Passenger ID</th>,
                            <th key="itineraryTitle">Itinerary Title</th>,
                            <th key="passengerName">Passenger Name</th>
                        ]}
                        <th></th>
                    </tr>
                </thead>
                
                <tbody>
                    {combinedData.map((row, index) => (
                        <TableRow 
                            key={index} 
                            rowObject={row} 
                            backendURL={backendURL} 
                            refreshItinerarypassengers={getData}
                        />
                    ))}

                </tbody>
            </table>
            <LinkItiPas
                itineraries={itineraries}
                passengers={passengers} 
                backendURL={backendURL} 
            />
            <UpdateItiPas 
                itineraryPassengers={itinerarypassengers}
                itineraries={itineraries}
                passengers={passengers} 
                backendURL={backendURL}  
            />    
        </>
    );
}

export default ItineraryPassengers;