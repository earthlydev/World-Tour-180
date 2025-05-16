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
        const display_ip = `SELECT ip.*, i.title AS itineraryTitle, 
                          CONCAT(p.firstName, ' ', p.lastName) AS passengerName 
                          FROM ItineraryPassengers ip
                          JOIN Itineraries i ON ip.itineraryID = i.itineraryID
                          JOIN Passengers p ON ip.passengerID = p.passengerID`;

        const [itinerarypassengers] = await db.query(display_ip);

        res.status(200).json({itinerarypassengers}); 

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// Get a specific itinerary passenger relationship
app.get('/itinerarypassengers/:ipID', async (req, res) => {
    try {
        const { ipID } = req.params;
        const query = `SELECT ip.*, i.title AS itineraryTitle, 
                      CONCAT(p.firstName, ' ', p.lastName) AS passengerName 
                      FROM ItineraryPassengers ip
                      JOIN Itineraries i ON ip.itineraryID = i.itineraryID
                      JOIN Passengers p ON ip.passengerID = p.passengerID
                      WHERE ip.ipID = ?`;
        
        const [itineraryPassenger] = await db.query(query, [ipID]);
        
        if (itineraryPassenger.length === 0) {
            return res.status(404).json({ error: 'Itinerary passenger relationship not found' });
        }
        
        res.status(200).json({ itineraryPassenger: itineraryPassenger[0] });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// Create a new itinerary passenger relationship
app.post('/itinerarypassengers', async (req, res) => {
    try {
        const { itineraryID, passengerID } = req.body;
        
        // Validate required fields
        if (!itineraryID || !passengerID) {
            return res.status(400).json({ 
                error: 'Itinerary ID and Passenger ID are required'
            });
        }
        
        // Optional: Check if relationship already exists
        const checkQuery = `SELECT COUNT(*) as count
                          FROM ItineraryPassengers
                          WHERE itineraryID = ? AND passengerID = ?`;
        
        const [checkResult] = await db.query(checkQuery, [itineraryID, passengerID]);
        
        if (checkResult[0].count > 0) {
            return res.status(409).json({ 
                error: 'This passenger is already linked to this itinerary'
            });
        }
        
        // Insert new relationship
        const insertQuery = `INSERT INTO ItineraryPassengers (itineraryID, passengerID) 
                           VALUES (?, ?)`;
        
        const [result] = await db.query(insertQuery, [itineraryID, passengerID]);
        
        res.status(201).json({ 
            ipID: result.insertId,
            itineraryID, 
            passengerID,
            message: 'Itinerary passenger relationship created successfully'
        });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// Update an existing itinerary passenger relationship
app.put('/itinerarypassengers/:ipID', async (req, res) => {
    try {
        const { ipID } = req.params;
        const { itineraryID, passengerID } = req.body;
        
        // Validate required fields
        if (!itineraryID || !passengerID) {
            return res.status(400).json({ 
                error: 'Itinerary ID and Passenger ID are required'
            });
        }
        
        // Update the relationship
        const updateQuery = `UPDATE ItineraryPassengers
                           SET itineraryID = ?, passengerID = ?
                           WHERE ipID = ?`;
        
        const [result] = await db.query(updateQuery, [itineraryID, passengerID, ipID]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                error: 'Itinerary passenger relationship not found'
            });
        }
        
        res.status(200).json({ 
            ipID,
            itineraryID,
            passengerID,
            message: 'Itinerary passenger relationship updated successfully'
        });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// Delete an itinerary passenger relationship
app.delete('/itinerarypassengers/:ipID', async (req, res) => {
    try {
        const { ipID } = req.params;
        
        const deleteQuery = `DELETE FROM ItineraryPassengers 
                           WHERE ipID = ?`;
        
        const [result] = await db.query(deleteQuery, [ipID]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                error: 'Itinerary passenger relationship not found'
            });
        }
        
        res.status(200).json({ 
            message: 'Itinerary passenger relationship deleted successfully'
        });
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
