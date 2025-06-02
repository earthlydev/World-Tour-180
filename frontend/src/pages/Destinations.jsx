import { useState, useEffect } from 'react';
import DesTableRow from '../components/Destination/DesTableRow';
import CreateDestination from '../components/Destination/CreateDestination';
import UpdateDestination from '../components/Destination/UpdateDestination';

function Destinations({ backendURL }) {
    const [destinations, setDestinations] = useState([]);


    const getData = async function () {
        try {
            const response = await fetch(backendURL + '/destinations');
            
            const {destinations} = await response.json();
    
            setDestinations(destinations);

        } catch (error) {
          console.log(error);
        }

    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Destinations</h1>

            <table>
                <thead>
                    <tr>
                        {destinations.length > 0 && [
                            <th key="destinationID">Destination ID</th>,
                            <th key="name">Name</th>,
                            <th key="country">Country</th>,
                            <th key="timezone">Timezone</th>,
                            <th key="visaRequired">Visa Required?</th>,
                            <th key="currency">Currency</th>,
                            <th key="language">Language</th>,
                            <th key="description">Description</th>
                            
                        ]}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {destinations.map((destination, index) => (
                        <DesTableRow key={index} rowObject={{
                            ...destination,
                            visaRequired: destination.visaRequired === 1 ? 'Yes' : 'No'
                        }} backendURL={backendURL} refreshDestination={getData}/>
                    ))}

                </tbody>
            </table>
            
            <CreateDestination backendURL={backendURL} refreshDestination={getData} />
            <UpdateDestination destinations={destinations} backendURL={backendURL} refreshDestination={getData} />               
        </>
    );

} 

export default Destinations;