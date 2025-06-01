-- --------------------------------------------------------------------------------
-- CS340 400
-- Jericho Arizala and Charles Caldwell
-- Group 53
-- Team Name: Team World Tour 180
-- Final #3

-- Citations:
    -- Data used for examples from public companies or fictitious
    -- https://canvas.oregonstate.edu/courses/1999601/pages/exploration-pl-slash-sql-part-1-sp-view-and-function?module_item_id=25352958
-- --------------------------------------------------------------------------------

-- #############################
-- RESET Database
-- #############################
DROP PROCEDURE IF EXISTS sp_load_worldtour180db;
DELIMITER //
CREATE PROCEDURE sp_load_worldtour180db()
BEGIN
    SET FOREIGN_KEY_CHECKS = 0;
    SET AUTOCOMMIT = 0;

    DROP TABLE IF EXISTS Customers;
    DROP TABLE IF EXISTS Passengers;
    DROP TABLE IF EXISTS Itineraries;
    DROP TABLE IF EXISTS Destinations;
    DROP TABLE IF EXISTS ItineraryDestinations;
    DROP TABLE IF EXISTS ItineraryPassengers;
    DROP TABLE IF EXISTS Agents;
    DROP TABLE IF EXISTS Airlines;
    DROP TABLE IF EXISTS Airports;
    DROP TABLE IF EXISTS Flights;

    -- Create Customers table
    CREATE TABLE Customers (
        customerID INT AUTO_INCREMENT NOT NULL,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        primaryPhone VARCHAR(30) NOT NULL,
        secondaryPhone VARCHAR(30),
        passportExpiration DATE NOT NULL,
        nationality VARCHAR(75) NOT NULL,
        dateOfBirth DATE NOT NULL,
        PRIMARY KEY (customerID)
    ); 

    -- Create Passengers table
    CREATE TABLE Passengers (
        passengerID INT AUTO_INCREMENT NOT NULL,
        customerID INT NOT NULL,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        primaryPhone VARCHAR(30) NOT NULL,
        secondaryPhone VARCHAR(30),
        passportExpiration DATE NOT NULL,
        nationality VARCHAR(75) NOT NULL,
        dateOfBirth DATE NOT NULL,
        relationshipToCustomer VARCHAR(75),
        PRIMARY KEY (passengerID),
        FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE CASCADE ON UPDATE CASCADE
    );

    -- Create Agents table
    CREATE TABLE Agents (
        agentID INT AUTO_INCREMENT NOT NULL,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        primaryPhone VARCHAR(30) NOT NULL,
        secondaryPhone VARCHAR(30),
        specialization VARCHAR(100),
        PRIMARY KEY (agentID)
    );

    -- Create Itineraries table
    CREATE TABLE Itineraries (
        itineraryID INT AUTO_INCREMENT NOT NULL,
        customerID INT NOT NULL,
        agentID INT NOT NULL,
        title VARCHAR(100) NOT NULL,
        startDate DATE NOT NULL,
        endDate DATE NOT NULL,
        notes VARCHAR(255),
        PRIMARY KEY (itineraryID),
        FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (agentID) REFERENCES Agents(agentID) ON DELETE CASCADE ON UPDATE CASCADE
    );

    -- Create Destinations table
    CREATE TABLE Destinations (
        destinationID INT AUTO_INCREMENT NOT NULL,
        name VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        timezone VARCHAR(50) NOT NULL,
        visaRequired BOOLEAN NOT NULL,
        currency VARCHAR(50),
        language VARCHAR(50),
        description VARCHAR(255),
        PRIMARY KEY (destinationID)
    );

    -- Create ItineraryDestinations table
    CREATE TABLE ItineraryDestinations (
        idID INT AUTO_INCREMENT NOT NULL,
        itineraryID INT NOT NULL,
        destinationID INT NOT NULL,
        PRIMARY KEY (idID),
        FOREIGN KEY (itineraryID) REFERENCES Itineraries(itineraryID) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (destinationID) REFERENCES Destinations(destinationID) ON DELETE CASCADE ON UPDATE CASCADE
    );  

    -- Create ItineraryPassengers table
        CREATE TABLE ItineraryPassengers (
        ipID INT AUTO_INCREMENT NOT NULL,
        itineraryID INT NOT NULL,
        passengerID INT NOT NULL,
        PRIMARY KEY (ipID),
        FOREIGN KEY (itineraryID) REFERENCES Itineraries(itineraryID) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (passengerID) REFERENCES Passengers(passengerID) ON DELETE CASCADE on UPDATE CASCADE
    );

    -- Create Airlines table
    CREATE TABLE Airlines (
        airlineID INT AUTO_INCREMENT NOT NULL,
        airlineName VARCHAR(100) NOT NULL,
        website VARCHAR(255),
        phone VARCHAR(30),
        PRIMARY KEY (airlineID)
    );

    -- Create Airports table
    CREATE TABLE Airports (
        airportID INT AUTO_INCREMENT NOT NULL,
        airportName VARCHAR(100) NOT NULL,
        iataCode VARCHAR(3) UNIQUE NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        timezone VARCHAR(50),
        PRIMARY KEY (airportID)
    );

    CREATE TABLE Flights (
        flightID INT AUTO_INCREMENT NOT NULL,
        itineraryID INT NOT NULL,
        airlineID INT NOT NULL,
        bookingReferenceNum VARCHAR(100) NOT NULL,
        flightNumber VARCHAR(10) NOT NULL,
        departureAirport INT NOT NULL,
        arrivalAirport INT NOT NULL,
        departureTime DATETIME NOT NULL,
        arrivalTime DATETIME NOT NULL,
        cabinClass VARCHAR(50) NOT NULL,
        notes VARCHAR (255),
        PRIMARY KEY (flightID),
        FOREIGN KEY (itineraryID) REFERENCES Itineraries(itineraryID) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (airlineID) REFERENCES Airlines(airlineID) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (departureAirport) REFERENCES Airports(airportID) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (arrivalAirport) REFERENCES Airports(airportID) ON DELETE CASCADE ON UPDATE CASCADE
    );

    -- Insertion of example data
    INSERT INTO Customers (firstName, lastName, email, primaryPhone, secondaryPhone, passportExpiration, nationality, dateOfBirth) VALUES 
    ('Mickey', 'Barnes', 'mickeyb@hello.com', '+1-213-093-3404', '+1-213-948-3889', '2028-07-01', 'British', '1986-05-13'),
    ('Elisabeth', 'Moore', 'elisabethm@bonjour.com', '+1-212-776-3221', '+1-212-345-7457', '2028-12-22', 'French', '1962-11-11'),
    ('Joel', 'Miller', 'joem@hello.com','+1-303-778-2234', NULL, '2027-03-22','American','1975-04-02'),
    ('Timothy','Ratliff','timothyr@hello.com','+1-845-896-3332',NULL, '2029-09-12','American','1963-06-06');

    INSERT INTO Passengers (customerID, firstName, lastName, email, primaryPhone, secondaryPhone, passportExpiration, nationality, dateOfBirth, relationshipToCustomer) VALUES
    (
        (SELECT customerID FROM Customers WHERE firstName = 'Elisabeth' AND lastName = 'Moore'),
        'Sue', 'Moore', 'suem@bonjour.com', '+1-212-234-5577', NULL, '2028-05-03','French','1994-10-23', 'Daughter'
    ),
    (
        (SELECT customerID From Customers WHERE firstName = 'Joel' AND lastName = 'Miller'),
        'Ellie', 'Miller', 'elliem@hello.com', '+1-303-142-1123', NULL,'2026-01-11','American','2003-11-25','Niece'
    ),
    (
        (SELECT customerID FROM Customers WHERE firstName = 'Timothy' AND lastName = 'Ratliff'),
        'Lochlan','Ratliff','lochlanr@hello.com','+1-845-113-8489',NULL,'2029-02-10','American','2003-11-26','Son'
    );

    -- Insert Agents
    INSERT INTO Agents (firstName, lastName, email, primaryPhone, secondaryPhone) VALUES
    ('Michael', 'Brown', 'mbrown@worldtour180.com', '+1-555-987-6543', NULL),
    ('Jennifer', 'Garcia', 'jgarcia@worldtour180.com', '+1-555-987-6542', NULL),
    ('Robert', 'Leaman', 'rleaman@worldtour180.com', '+1-555-987-6541', '+1-555-345-6789'),
    ('Lisa', 'Chen', 'lchen@worldtour180.com', '+1-555-987-6540', NULL);

    INSERT INTO Itineraries (customerID, agentID, title, startDate, endDate, notes) VALUES
    (
        (SELECT customerID FROM Customers WHERE firstName = 'Mickey' AND lastName = 'Barnes'),
        (SELECT agentID FROM Agents WHERE firstName = 'Michael' AND lastName = 'Brown'),
        'Amsterdam Tech Conference', '2025-10-20','2025-10-24','Attendance at a space technology summit.'
    ),
    (
        (SELECT customerID FROM Customers WHERE firstName = 'Elisabeth' AND lastName = 'Moore'),
        (SELECT agentID FROM Agents WHERE firstName = 'Jennifer' AND lastName = 'Garcia'),
        'Japan Cherry Blossoms ','2026-05-03','2026-06-01','To Tokyo with visits to Sanrio Land and Universal Studios.'
    ),
    (
        (SELECT customerID FROM Customers WHERE firstName = 'Joel' AND lastName = 'Miller'),
        (SELECT agentID FROM Agents WHERE firstName = 'Robert' AND lastName = 'Leaman'),
        'Paris Adventure', '2025-12-20', '2025-01-02', 'Christmas in Paris and New Years celebration at the Eiffel Tower. Visits at the Louvre and Notre Dame.'
    ),
    (
        (SELECT customerID FROM Customers WHERE firstName = 'Timothy' AND lastName = 'Ratliff'),
        (SELECT agentID FROM Agents WHERE firstName = 'Lisa' AND lastName = 'Chen'),
        'Thailand Summer Escape', '2025-07-05', '2025-07-30', 'Thailand All-Inclusive Resort in Koh Samui Island with food, spa treatments, and shows.'
    );

    -- INSERT Destinations
    INSERT INTO Destinations (name, country, timezone, visaRequired, currency, language, description) VALUES 
    ('Amsterdam','Netherlands','UTC+1',FALSE,'EUR','Dutch', NULL),
    ('Tokyo','Japan','UTC+9',FALSE,'JPY','Japanese', 'Tokyo is the most populous and capital of Japan.'),
    ('Paris','France','UTC+1',FALSE,'EUR','French', 'Paris is home to the Eiffel Tower and the capital of France.'),
    ('Koh Samui Island','Thailand','UTC+7',FALSE,'THB','Thai', NULL);

    -- Insert ItineraryDestinations 
    INSERT INTO ItineraryDestinations (itineraryID, destinationID) VALUES 
    (
        (SELECT itineraryID FROM Itineraries WHERE title = 'Amsterdam Tech Conference'),
        (SELECT destinationID FROM Destinations WHERE name = 'Amsterdam') 
    ),
    (
        (SELECT itineraryID FROM Itineraries WHERE title = 'Japan Cherry Blossoms'),
        (SELECT destinationID FROM Destinations WHERE name = 'Tokyo')
    ),
    (
        (SELECT itineraryID FROM Itineraries WHERE title = 'Paris Adventure'),
        (SELECT destinationID FROM Destinations WHERE name = 'Paris')
    ),
    (
        (SELECT itineraryID FROM Itineraries WHERE title = 'Thailand Summer Escape'),
        (SELECT destinationID FROM Destinations WHERE name = 'Koh Samui Island')
    );

    -- Insert ItineraryPassengers
    INSERT INTO ItineraryPassengers (itineraryID, passengerID) 
    SELECT Itineraries.itineraryID, Passengers.passengerID
    FROM Itineraries
    JOIN Passengers ON Itineraries.customerID = Passengers.customerID;

    -- Insert Airlines
    INSERT INTO Airlines (airlineName, website, phone) VALUES
    ('Global Airways', 'https://globalairways.com', '+1-800-123-4567'),
    ('Pacific International', 'https://pacificintl.com', '+1-800-234-5678'),
    ('European Air', 'https://europeanair.com', '+44-800-987-6543'),
    ('Nippon Airlines', 'https://nipponair.com', '+81-3-1234-5678'),
    ('Oceanic Flights', 'https://oceanicflights.com', '+61-2-9876-5432');

    -- Insert Airports
    INSERT INTO Airports (airportName, iataCode, city, country, timezone) VALUES
    ('Seattle-Tacoma International', 'SEA', 'Seattle', 'United States of America', 'UTC-8'),
    ('Charles de Gaulle Airport', 'CDG', 'Paris', 'France', 'UTC+1'),
    ('Narita International Airport', 'NRT', 'Tokyo', 'Japan', 'UTC+9'),
    ('John F. Kennedy International', 'JFK', 'New York', 'United States of America', 'UTC-5'),
    ('Sydney Airport', 'SYD', 'Sydney', 'Australia', 'UTC+10');

    -- Insert Flights
    INSERT INTO Flights (itineraryID, airlineID, bookingReferenceNum, flightNumber, departureAirport, arrivalAirport, departureTime, arrivalTime, cabinClass, notes) VALUES
    (1, 3, 'EAXYZ123', 'EA205', 1, 2, '2025-06-10 13:45:00', '2025-06-11 07:30:00', 'Business', 'Window seats requested'),
    (1, 3, 'EAABC456', 'EA306', 2, 1, '2025-06-24 11:20:00', '2025-06-24 14:05:00', 'Business', 'Vegetarian meals'),
    (3, 4, 'NADEF789', 'NA101', 1, 3, '2025-09-05 10:15:00', '2025-09-06 14:30:00', 'Economy', 'Aisle seats preferred'),
    (3, 4, 'NAGHI012', 'NA102', 3, 1, '2025-09-19 16:45:00', '2025-09-19 10:30:00', 'Economy', NULL),
    (4, 5, 'OFJKL345', 'OF403', 1, 5, '2025-11-10 22:30:00', '2025-11-12 06:15:00', 'Premium Economy', 'Extra legroom');

    -- Re-enable foreign key checks and commits
    SET FOREIGN_KEY_CHECKS=1;
    COMMIT;  
END //
DELIMITER ;
