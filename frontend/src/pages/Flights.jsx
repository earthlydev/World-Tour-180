import { useState, useEffect } from 'react';
import FlightTableRow from '../components/Flights/FlightTableRow';
import CreateFlight from '../components/Flights/CreateFlight';
import UpdateFlight from '../components/Flights/UpdateFlight';


function Flights({ backendURL }) {
    const [flights, setFlights] = useState([]);
    const [itineraries, setItineraries] = useState([]);
    const [airlines, setAirlines] = useState([]);
    const [airports, setAirports] = useState([]);

    const getData = async function () {
        try {
            const response = await fetch(backendURL + '/flights');
            const itiRes = await fetch(backendURL + '/itineraries');
            const airlinesRes = await fetch(backendURL + '/airlines');
            const airportsRes = await fetch(backendURL + '/airports');

            const {flights} = await response.json();
            const { itineraries } = await itiRes.json();
            const { airlines } = await airlinesRes.json();
            const { airports } = await airportsRes.json();

            setFlights(flights);
            setItineraries(itineraries);
            setAirlines(airlines);
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
                    flights.map((flight, index) => (<FlightTableRow key={index} rowObject={{
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

            <CreateFlight
                itineraries={itineraries}
                airlines={airlines}
                airports={airports} 
                backendURL={backendURL} refreshFlight={getData} 
            />
            <UpdateFlight 
                flights={flights}
                itineraries={itineraries}
                airlines={airlines}
                airports={airports} 
                backendURL={backendURL} 
                refreshFlight={getData} 
            />
        </>
    )
}

export default Flights;