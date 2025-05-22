
import { Link } from "react-router-dom";
import ResetButton from './ResetButton';

function Navigation({ backendURL }) {
    // Function to refresh the page after reset
    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <nav>
            <div className="navbar">
                <div className="navbar-links">
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
                </div>
            </div>
            <div className="reset-container" style={{ marginTop: '10px', textAlign: 'center' }}>
                <ResetButton 
                    backendURL={backendURL} 
                    onResetComplete={refreshPage} 
                />
            </div>
        </nav>
    );
} 

export default Navigation;