import { useState, useEffect } from 'react';
import TableRow from '../components/TableRow';
import CreateFlight from '../components/CreateFlight';
import UpdateFlight from '../components/UpdateFlight';


function Flights({ backendURL }) {
    const [flights, setFlights] = useState([]);

    const getData = async function () {
        try {
            const response = await fetch(backendURL + '/flights');

            const {flights} = await response.json();

            setFlights(flights);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <h1>Flights</h1>

            <table>
                <thead>
                    <tr>
                        {flights.length > 0 && [
                            <th key="flightID">Flight ID</th>,
                            <th key="itineraryID">Itinerary ID</th>,
                            <th key="airlineID">Airline ID</th>,
                            <th key="bookingReferenceNum">Booking Reference Number</th>,
                            <th key="flightNumber">Flight Number</th>,
                            <th key="departureAirport">Departure Airport</th>,
                            <th key="arrivalAirport">Arrival Airport</th>,
                            <th key="departureTime">Departure Time</th>,
                            <th key="arrivalTime">Arrival Time</th>,
                            <th key="cabinClass">Cabin Class</th>,
                            <th key="notes">Notes</th>,

                        ]}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                    flights.map((flight, index) => (<TableRow key={index} rowObject={{
                        ...flight,
                        departureTime: new Date(flight.departureTime).toLocaleString([], {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit' 
                    }),
                    arrivalTime: new Date(flight.arrivalTime).toLocaleString([], {
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                }} backendURL={backendURL} refreshFlight={getData}/>))
                    }
                </tbody>
            </table>

            <CreateFlight backendURL={backendURL} refreshFlight={getData} />
            <UpdateFlight flights={flights} backendURL={backendURL} refreshFlight={getData} />
        </>
    )
}

export default Flights;