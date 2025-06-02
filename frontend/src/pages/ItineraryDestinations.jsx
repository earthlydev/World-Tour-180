// Citation: copilot.microsoft.com
// Prompt: How do I map specificy data to show on a React?
import { useState, useEffect } from 'react';
import ItiDesTableRow from '../components/ItiDes/ItiDesTableRow';
import LinkItiDes from '../components/ItiDes/LinkItiDes';
import UpdateItiDes from '../components/ItiDes/UpdateItiDes';

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
            
            const { itinerarydestinations } = await response.json();
            const { itineraries } = await itiRes.json();
            const { destinations } = await desRes.json();

            setItineraryDestinations(itinerarydestinations);
            setItineraries(itineraries);
            setDestinations(destinations);

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
                title: itineraryMap[item.itineraryID]?.title || 'Unknown',
                name: destinationMap[item.destinationID]?.name || 'Unknown'
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
                            <th key="title">Itinerary Title</th>,
                            <th key="name">Destination Name</th>
                        ]}
                        <th></th>
                    </tr>
                </thead>
                
                <tbody>
                    {combinedData.map((row, index) => (
                        <ItiDesTableRow 
                            key={index} 
                            rowObject={row} 
                            backendURL={backendURL} 
                            refreshItiDes={getData}
                        />
                    ))}

                </tbody>
            </table>
            <LinkItiDes
                itineraries={itineraries}
                destinations={destinations} 
                backendURL={backendURL}
                refreshItiDes={getData} 
            />
            <UpdateItiDes 
                itineraryDestinations={itinerarydestinations}
                itineraries={itineraries}
                destinations={destinations} 
                backendURL={backendURL}
                refreshItiDes={getData} 

            />    
        </>
    );
}

export default ItineraryDestinations;