// ########################################
// ########## SETUP

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// ########################################
// ########## HELPER FUNCTIONS

// Helper function to format dates
function formatDate(dateString) {
    if (!dateString) return null;
    return new Date(dateString).toISOString().split('T')[0];
}

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests

const PORT = 6453;

// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
// ---- DESTINATIONS ROUTES ----
app.get('/destinations', async (req, res) => {
    try {
        const display_destinations = `SELECT * FROM Destinations;`;

        const [destinations] = await db.query(display_destinations);

        res.status(200).json({ destinations });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});

// ---- CUSTOMERS ROUTES ----
app.get('/debug', async (req, res) => {
    try {
        const display_customers = `SELECT * FROM Customers;`;
        const [customers] = await db.query(display_customers);
        
        // Format the date fields
        const formattedCustomers = customers.map(customer => ({
            ...customer,
            passportExpiration: formatDate(customer.passportExpiration),
            dateOfBirth: formatDate(customer.dateOfBirth)
        }));
 
        res.status(200).json({ customers: formattedCustomers });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// ---- PASSENGERS ROUTES ----
app.get('/passengers', async (req, res) => {
    try {
        const display_passengers = `SELECT * FROM Passengers;`;
 
        const [passengers] = await db.query(display_passengers);
        
        // Format the date fields
        const formattedPassengers = passengers.map(passenger => ({
            ...passenger,
            passportExpiration: formatDate(passenger.passportExpiration),
            dateOfBirth: formatDate(passenger.dateOfBirth)
        }));
 
        res.status(200).json({ passengers: formattedPassengers });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// ---- AGENTS ROUTES ----
app.get('/agents', async (req, res) => {
    try {
        const display_agents = `SELECT * FROM Agents;`;

        const [agents] = await db.query(display_agents);

        res.status(200).json({ agents });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// ---- ITINERARIES ROUTES ----
app.get('/itineraries', async (req, res) => {
    try {
        const display_itineraries = `SELECT * FROM Itineraries;`;

        const [itineraries] = await db.query(display_itineraries);

        res.status(200).json({ itineraries });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// ---- ITINERARY DESTINATIONS ROUTES ----
app.get('/itinerarydestinations', async (req, res) => {
    try {
        const display_id = `SELECT * FROM ItineraryDestinations`;

        const [itinerarydestinations] = await db.query(display_id);

        res.status(200).json({itinerarydestinations}); 

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// ---- ITINERARY PASSENGERS ROUTES ----
app.get('/itinerarypassengers', async (req, res) => {
    try {
        const display_ip = `SELECT * FROM ItineraryPassengers`;

        const [itinerarypassengers] = await db.query(display_ip);

        res.status(200).json({itinerarypassengers}); 

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// ---- AIRLINES ROUTES ----
app.get('/airlines', async (req, res) => {
    try {
        const display_airlines = `SELECT * FROM Airlines`;

        const [airlines] = await db.query(display_airlines);

        res.status(200).json({ airlines });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// ---- AIRPORTS ROUTES ----
app.get('/airports', async (req, res) => {
    try {
        const display_airports = `SELECT * FROM Airports`;

        const [airports] = await db.query(display_airports);

        res.status(200).json({ airports }); 
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// ---- FLIGHTS ROUTES ----
app.get('/flights', async (req, res) => {
    try {
        const display_flights = `SELECT * FROM Flights`;

        const [flights] = await db.query(display_flights);

        res.status(200).json({ flights });

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
