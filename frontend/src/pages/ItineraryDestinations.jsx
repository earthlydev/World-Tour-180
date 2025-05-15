import { useState, useEffect } from 'react';  // Importing useState for managing state in the component
import TableRow from '../components/TableRow';
import LinkItiDes from '../components/LinkItiDes';
import UpdateItiDes from '../components/UpdateItiDes';

function ItineraryDestinations({ backendURL }) {
    const [itinerarydestinations, setItineraryDestinations] = useState([]);
    const [itineraries, setItineraries] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [combinedData, setCombinedData] = useState([]);
    
    const getData = async function () {
        try {
            const response = await fetch(backendURL + '/itinerarydestinations');
            const itiRes = await fetch(backendURL + '/itineraries');
            const desRes = await fetch(backendURL + '/destinations');
            
            const {itinerarydestinations} = await response.json();
            const { itineraries } = await itiRes.json();
            const { destinations } = await desRes.json();

            setItineraryDestinations(itinerarydestinations);
            setItineraries(itineraries);
            setDestinations(destinations);

            // Create lookup objects and combine data
            const itineraryMap = {};
            itineraries.forEach(it => {
                itineraryMap[it.itineraryID] = it;
            });

            const destinationMap = {};
            destinations.forEach(dest => {
                destinationMap[dest.destinationID] = dest;
            });

            const enrichedData = itinerarydestinations.map(item => ({
                ...item,
                itineraryTitle: itineraryMap[item.itineraryID]?.title || 'Unknown',
                destinationName: destinationMap[item.destinationID]?.name || 'Unknown'
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
            <h1>Itinerary Destinations</h1>

            <table>
                <thead>
                    <tr>
                        {combinedData.length > 0 && [
                            <th key="idID">Itinerary Destinations ID</th>,
                            <th key="itineraryID">Itinerary ID</th>,
                            <th key="destinationID">Destination ID</th>,
                            <th key="itineraryTitle">Itinerary Title</th>,
                            <th key="destinationName">Destination Name</th>
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
                            refreshItinerarydestinations={getData}
                        />
                    ))}

                </tbody>
            </table>
            <LinkItiDes
                itineraries={itineraries}
                destinations={destinations} 
                backendURL={backendURL} 
            />
            <UpdateItiDes 
                itineraryDestiantions={itinerarydestinations}
                itineraries={itineraries}
                destinations={destinations} 
                backendURL={backendURL}  
            />    
        </>
    );
}

export default ItineraryDestinations;