import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/passengers">Passengers</Link>
            <Link to="/agents">Agents</Link>
            <Link to="/itineraries">Itineraries</Link>
            <Link to="/destinations">Destinations</Link>
            <Link to="/itinerarydestinations">Itinerary Destinations</Link>
            <Link to="/itinerarypassengers">Itinerary Passengers</Link>
            <Link to="/airlines">Airlines</Link>
            <Link to="/airports">Airports</Link>
            <Link to="/flights">Flights</Link>
        </nav>
    )
} 
export default Navigation;
