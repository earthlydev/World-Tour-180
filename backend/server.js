// Citation
// https://canvas.oregonstate.edu/courses/1999601/pages/exploration-web-application-technology-2?module_item_id=25352948

// ########################################
// ########## SETUP

// Database
const db = require('./database/db-connector');

// File system module to read SQL file
const fs = require('fs');
const path = require('path');

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
const { devNull } = require('os');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests

const PORT = 4398; // 6453

// ########################################
// ########## ROUTE HANDLERS

// RESET DATABASE ROUTE
app.post('/reset', async (req, res) => {
    try {
        // Find the path to the DDL.SQL file in the database directory
        const ddlPath = path.join(__dirname, 'database', 'DDL.SQL');
        console.log('Looking for DDL.SQL at:', ddlPath);
        
        // Read the DDL.SQL file
        const ddlScript = fs.readFileSync(ddlPath, 'utf8');
        
        // Split the script by semicolons to get individual SQL statements
        const statements = ddlScript
            .split(';')
            .filter(statement => statement.trim() !== '');
        
        // Execute each statement sequentially
        for (const statement of statements) {
            if (statement.trim()) {
                await db.query(statement);
            }
        }
        
        res.status(200).json({ message: 'Database reset successfully' });
    } catch (error) {
        console.error("Error resetting database:", error);
        res.status(500).json({ 
            error: "An error occurred while resetting the database",
            details: error.message
        });
    }
});

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

// CREATE destination
app.post('/destinations/create', async function (req, res) {
    try {
        let data = req.body;

        if (data.create_currency === '') data.create_currency = null;
        if (data.create_language === '') data.create_language = null;
        if (data.create_description === '') data.create_description = null;


        const query1 = `CALL sp_CreateDestination(?, ?, ?, ?, ?, ?, ?, @new_id);`;

        const [[[rows]]] = await db.query(query1, [
            data.create_name,
            data.create_country,
            data.create_timezone,
            data.create_visaRequired,
            data.create_currency,
            data.create_language,
            data.create_description
        ]);

        console.log(`CREATE destination. ID: ${rows.new_id} ` +
            `Name: ${data.create_name}`
        );

        res.status(200).json({ message: 'Destination created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// UPDATE destination
app.post('/destinations/update', async function (req, res) {
    try {
        const data = req.body;

        if (data.update_currency === '') data.update_currency = null;
        if (data.update_language === '') data.update_language = null;
        if (data.update_description === '') data.update_description = null;

        const query1 = 'CALL sp_UpdateDestination(?, ?, ?, ?, ?, ?, ?, ?);';
        const query2 = 'SELECT name FROM Destinations WHERE destinationID = ?;';
        await db.query(query1, [
            data.update_id,
            data.update_name,
            data.update_country,
            data.update_timezone,
            data.update_visaRequired,
            data.update_currency,
            data.update_language,
            data.update_description
        ]);
        const [[rows]] = await db.query(query2, [data.update_id]);

        console.log(`UPDATE destinations. ID: ${data.update_id} ` +
            `Name: ${rows.name}`
        );

        res.status(200).json({ message: 'Destinations updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// Delete for destination
app.post('/destinations/delete', async (req, res) => {
    try {
        let data = req.body;
        const query1 = `CALL sp_DeleteDestination(?);`;
        await db.query(query1, [data.delete_id]);

        console.log(`DELETE destinations. ID: ${data.delete_id} ` +
            `Name: ${data.delete_name}`
        );
        res.status(200).json({ message: 'Destination deleted successfully.' });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// ---- CUSTOMERS ROUTES ----
app.get('/customers', async (req, res) => {
    try {
        const display_customers = `SELECT * FROM Customers;`;
        const [customers] = await db.query(display_customers);
        
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

// CREATE itinerarydestination
app.post('/itinerarydestinations/create', async function (req, res) {
    try {
        let data = req.body;

        if (!data.create_i_id || !data.create_d_id) {
            return res.status(400).json({ error: 'Itinerary ID and destination ID are required.' });
        }

        const query1 = `CALL sp_CreateItiDes(?, ?, @new_id);`;

        const [[[rows]]] = await db.query(query1, [
            data.create_i_id,
            data.create_d_id,
        ]);

        console.log(`CREATE itinerarydestinations. ID: ${rows.new_id} `);

        res.status(200).json({ message: 'ItiDes created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// UPDATE itinerarydestination
app.post('/itinerarydestinations/update', async function (req, res) {
    try {
        const data = req.body;

        const query1 = 'CALL sp_UpdateItiDes(?, ?, ?);';
        await db.query(query1, [
            data.update_id,
            data.update_i_id,
            data.update_d_id,
        ]);

        console.log(`UPDATE itinerarydestinations. ID: ${data.update_id} `);

        res.status(200).json({ message: 'ItiDes updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// DELETE itinerary destination
app.post('/itinerarydestinations/delete', async function (req, res) {
    try {
        let data = req.body;

        const query1 = `CALL sp_DeleteItiDes(?);`;
        await db.query(query1, [data.delete_id]);

        console.log(`DELETE itinerarydestinations. ID: ${data.delete_id} `);
        res.redirect('/itinerarydestinations');
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
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

// DELETE ROUTES
// Adds a simple delete endpoint for Customers to demo database changes
app.delete('/customers/:customerID', async (req, res) => {
    try {
        const { customerID } = req.params;
        
        const deleteQuery = `DELETE FROM Customers WHERE customerID = ?`;
        
        const [result] = await db.query(deleteQuery, [customerID]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                error: 'Customer not found'
            });
        }
        
        res.status(200).json({ 
            message: 'Customer deleted successfully'
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

// CREATE airlines
app.post('/airlines/create', async function (req, res) {
    try {
        let data = req.body;

        if (data.create_website === '') data.create_website = null;
        if (data.create_phone === '') data.create_phone = null;

        const query1 = `CALL sp_CreateAirline(?, ?, ?, @new_id);`;

        const [[[rows]]] = await db.query(query1, [
            data.create_name,
            data.create_website,
            data.create_phone
        ]);

        console.log(`CREATE airlines. ID: ${rows.new_id} ` +
            `Name: ${data.create_name}`);

        res.status(200).json({ message: 'Airline created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// UPDATE airlines
app.post('/airlines/update', async function (req, res) {
    try {
        const data = req.body;

        if (data.update_website === '') data.update_website = null;
        if (data.update_phone === '') data.update_phone = null;

        const query1 = 'CALL sp_UpdateAirline(?, ?, ?, ?);';
        const query2 = 'SELECT airlineName FROM Airlines WHERE airlineID = ?;';
        await db.query(query1, [
            data.update_id,
            data.update_name,
            data.update_website,
            data.update_phone,
        ]);
        const [[rows]] = await db.query(query2, [data.update_id]);

        console.log(`UPDATE airlines. ID: ${data.update_id} ` +
            `Name: ${rows.airlineName}`
        );

        res.status(200).json({ message: 'Airline updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// DELETE Airlines
app.post('/airlines/delete', async function (req, res) {
    try {
        let data = req.body;

        const query1 = `CALL sp_DeleteAirline(?);`;
        await db.query(query1, [data.delete_id]);

        console.log(`DELETE airlines. ID: ${data.delete_id} ` +
            `Name: ${data.delete_name}`
        );

        res.redirect('/airlines');
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// ---- AIRPORTS ROUTES ----
// READ Airports
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

// CREATE airports
app.post('/airports/create', async function (req, res) {
    try {
        let data = req.body;
        
        if (data.create_timezone === '') data.create_timezone = null;

        const query1 = `CALL sp_CreateAirport(?, ?, ?, ?, ?, @new_id);`;

        const [[[rows]]] = await db.query(query1, [
            data.create_name,
            data.create_iata,
            data.create_city,
            data.create_country,
            data.create_timezone,
        ]);

        console.log(`CREATE airports. ID: ${rows.new_id} ` +
            `Name: ${data.create_name}`);

        res.status(200).json({ message: 'Airport created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// UPDATE airports
app.post('/airports/update', async function (req, res) {
    try {
        const data = req.body;

        if (data.update_timezone === '') data.update_timezone = null;

        const query1 = 'CALL sp_UpdateAirport(?, ?, ?, ?, ?, ?);';
        const query2 = 'SELECT airportName FROM Airports WHERE airportID = ?;';
        await db.query(query1, [
            data.update_id,
            data.update_name,
            data.update_iata,
            data.update_city,
            data.update_country,
            data.update_timezone,
        ]);
        const [[rows]] = await db.query(query2, [data.update_id]);

        console.log(`UPDATE airports. ID: ${data.update_id} ` +
            `Name: ${rows.airportName}`
        );

        res.status(200).json({ message: 'Airport updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// DELETE airports
app.post('/airports/delete', async function (req, res) {
    try {
        let data = req.body;

        const query1 = `CALL sp_DeleteAirport(?);`;
        await db.query(query1, [data.delete_id]);

        console.log(`DELETE airports. ID: ${data.delete_id} ` +
            `Name: ${data.delete_name}`
        );
        res.redirect('/airlines');
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
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

// CREATE flights
app.post('/flights/create', async function (req, res) {
    try {
        let data = req.body;

        if (data.create_notes === '') data.create_notes = null;

        const query1 = `CALL sp_CreateFlight(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @new_id);`;

        const [[[rows]]] = await db.query(query1, [
            data.create_i_id,
            data.create_a_id,
            data.create_bookingNum,
            data.create_flightNum,
            data.create_depAirport,
            data.create_arrAirport,
            data.create_depTime,
            data.create_arrTime,
            data.create_cabinClass,
            data.create_notes
        ]);

        console.log(`CREATE flights. ID: ${rows.new_id} ` +
            `Booking Reference Number: ${data.create_bookingNum}`);

        res.status(200).json({ message: 'Flights created successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// UPDATE flights
app.post('/flights/update', async function (req, res) {
    try {
        const data = req.body;

        if (isNaN(parseInt(data.update_notes)))
            data.update_notes = null;

        const query1 = 'CALL sp_UpdateFlight(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        const query2 = 'SELECT bookingReferenceNum FROM Flights WHERE flightID = ?;';
        await db.query(query1, [
            data.update_id,
            data.update_i_id,
            data.update_a_id,
            data.update_bookingNum,
            data.update_flightNum,
            data.update_depAirport,
            data.update_arrAirport,
            data.update_depTime,
            data.update_arrTime,
            data.update_cabinClass,
            data.update_notes,
        ]);
        const [[rows]] = await db.query(query2, [data.update_id]);

        console.log(`UPDATE flights. ID: ${data.update_id} ` +
            `Booking Reference Number: ${rows.bookingReferenceNum}`
        );

        res.status(200).json({ message: 'Flights updated successfully' });
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// DELETE flights
app.post('/flights/delete', async function (req, res) {
    try {
        let data = req.body;

        const query1 = `CALL sp_DeleteFlight(?);`;
        await db.query(query1, [data.delete_id]);

        console.log(`DELETE flights. ID: ${data.delete_id} ` +
            `Name: ${data.delete_name}`
        );

        res.redirect('/flights');
    } catch (error) {
        console.error('Error executing queries:', error);
        res.status(500).send(
            'An error occurred while executing the database queries.'
        );
    }
});

// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});
