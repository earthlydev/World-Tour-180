// Citation
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Customers from './pages/Customers';
import Passengers from './pages/Passengers';
import Agents from './pages/Agents';
import Itineraries from './pages/Itineraries';
import Destinations from './pages/Destinations';
import ItineraryDestinations from './pages/ItineraryDestinations';
import ItineraryPassengers from './pages/ItineraryPassengers';
import Airlines from './pages/Airlines';
import Airports from './pages/Airports';
import Flights from './pages/Flights';

// Components
import Navigation from './components/Navigation';

// Define the backend port and URL for API requests
const backendPort = 6453;

const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

    return (
        <>
            <Navigation backendURL={backendURL} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/customers" element={<Customers backendURL={backendURL} />} />
                <Route path="/passengers" element={<Passengers backendURL={backendURL} />} />
                <Route path="/agents" element={<Agents backendURL={backendURL} />} />
                <Route path="/itineraries" element={<Itineraries backendURL={backendURL} />} />
                <Route path="/destinations" element={<Destinations backendURL={backendURL} />} />
                <Route path="/itinerarydestinations" element={<ItineraryDestinations backendURL={backendURL} />}/>
                <Route path="/itinerarypassengers" element={<ItineraryPassengers backendURL={backendURL} />} />
                <Route path="/airlines" element={<Airlines backendURL={backendURL} />}/>
                <Route path="/airports" element={<Airports backendURL={backendURL} />}/>
                <Route path="/flights" element={<Flights backendURL={backendURL} />}/>
            </Routes>
        </>
    );

} export default App;
