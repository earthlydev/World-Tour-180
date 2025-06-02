-- --------------------------------------------------------------------------------
-- CS340 400
-- Jericho Arizala and Charles Caldwell
-- Group 53
-- Team Name: Team World Tour 180
-- Draft #4

-- Citations:
    -- Data used for examples from public companies or fictitious
    -- https://canvas.oregonstate.edu/courses/1999601/pages/exploration-pl-slash-sql-part-1-sp-view-and-function?module_item_id=25352958
-- --------------------------------------------------------------------------------
-- #############################
-- CREATE destinations
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateDestination;

DELIMITER //
CREATE PROCEDURE sp_CreateDestination(
   IN d_name VARCHAR(100),
   IN d_country VARCHAR(100),
   IN d_timezone VARCHAR(50),
   IN d_visaRequired BOOLEAN,
   IN d_currency VARCHAR(50),
   IN d_language VARCHAR(50),
   IN d_description VARCHAR(255),
   OUT id INT)
BEGIN
    INSERT INTO Destinations (name, country, timezone, visaRequired, currency, language, description) 
    VALUES (d_name, d_country, d_timezone, d_visaRequired, d_currency, d_language, d_description);

    SELECT LAST_INSERT_ID() into id;
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;

-- #############################
-- CREATE itineraryDestinations
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateItiDes;

DELIMITER //
CREATE PROCEDURE sp_CreateItiDes(
    IN i_id INT,
    IN d_id INT,
    OUT id INT)
BEGIN  
    INSERT INTO ItineraryDestinations (itineraryID, destinationID)
    VALUES (i_id, d_id);

    SELECT LAST_INSERT_ID() into id;
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ; 

-- #############################
-- CREATE airlines
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateAirline;

DELIMITER //
CREATE PROCEDURE sp_CreateAirline(
    IN name VARCHAR(100),
    IN a_website VARCHAR(255),
    IN a_phone VARCHAR(30),
    OUT id INT)
BEGIN
    INSERT INTO Airlines (airlineName, website, phone) 
    VALUES (name, a_website, a_phone);

    SELECT LAST_INSERT_ID() into id;
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;

-- #############################
-- CREATE airports
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateAirport;

DELIMITER //
CREATE PROCEDURE sp_CreateAirport(
    IN a_airportName VARCHAR(100),
    IN a_iataCode VARCHAR(3),
    IN a_city VARCHAR(100),
    IN a_country VARCHAR(100),
    IN a_timezone VARCHAR(50),
    OUT id INT)
BEGIN
    INSERT INTO Airports (airportName, iataCode, city, country, timezone) 
    VALUES (a_airportName, a_iataCode, a_city, a_country, a_timezone);

    SELECT LAST_INSERT_ID() into id;
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;

-- #############################
-- CREATE flights
-- #############################
DROP PROCEDURE IF EXISTS sp_CreateFlight;

DELIMITER //
CREATE PROCEDURE sp_CreateFlight(
    IN f_itineraryID INT,
    IN f_airlineID INT,
    IN f_bookingReferenceNum VARCHAR(100),
    IN f_flightNumber VARCHAR(10),
    IN f_departureAirport INT,
    IN f_arrivalAirport INT,
    IN f_departureTime DATETIME,
    IN f_arrivalTime DATETIME,
    IN f_cabinClass VARCHAR(50),
    IN f_notes VARCHAR (255),
    OUT id INT)
BEGIN
    INSERT INTO Flights (itineraryID, airlineID, bookingReferenceNum, flightNumber, departureAirport, arrivalAirport, departureTime, arrivalTime, cabinClass, notes) 
    VALUES (f_itineraryID, f_airlineID,f_bookingReferenceNum, f_flightNumber, f_departureAirport, f_arrivalAirport, f_departureTime, f_arrivalTime, f_cabinClass, f_notes);

    SELECT LAST_INSERT_ID() into id;
    SELECT LAST_INSERT_ID() AS 'new_id';

END //
DELIMITER ;

-- #############################
-- UPDATE destinations
-- #############################
DROP PROCEDURE IF EXISTS sp_UpdateDestination;

DELIMITER //
CREATE PROCEDURE sp_UpdateDestination(
    IN id INT, 
    IN d_name VARCHAR(100),
    IN d_country VARCHAR(100),
    IN d_timezone VARCHAR(50),
    IN d_visaRequired BOOLEAN,
    IN d_currency VARCHAR(50),
    IN d_language VARCHAR(50),
    IN d_description VARCHAR(255))
BEGIN
    UPDATE Destinations 
    SET
    name = d_name, 
    country = d_country, 
    timezone = d_timezone, 
    visaRequired = d_visaRequired, 
    currency = d_currency, 
    language = d_language, 
    description = d_description
    WHERE destinationID = id; 
END //
DELIMITER ;

-- #############################
-- UPDATE ITINERARY DESTINATIONS
-- #############################

DROP PROCEDURE IF EXISTS sp_UpdateItiDes;

DELIMITER //
CREATE PROCEDURE sp_UpdateItiDes(
    IN id INT, 
    IN i_id INT,
    IN d_id INT
)
BEGIN
    UPDATE ItineraryDestinations 
    SET
        itineraryID = i_id, 
        destinationID = d_id 
    WHERE idID = id; 
END //
DELIMITER ;

-- #############################
-- UPDATE airlines
-- #############################
DROP PROCEDURE IF EXISTS sp_UpdateAirline;

DELIMITER //
CREATE PROCEDURE sp_UpdateAirline(
    IN id INT, 
    IN a_name VARCHAR(100),
    IN a_website VARCHAR(255),
    IN a_phone VARCHAR(30))
BEGIN
    UPDATE Airlines 
    SET
    airlineName = a_name, 
    website = a_website, 
    phone = a_phone
    WHERE airlineID = id; 
END //
DELIMITER ;

-- #############################
-- UPDATE airports
-- #############################
DROP PROCEDURE IF EXISTS sp_UpdateAirport;

DELIMITER //
CREATE PROCEDURE sp_UpdateAirport(
    IN id INT, 
    IN a_airportName VARCHAR(100),
    IN a_iataCode VARCHAR(3),
    IN a_city VARCHAR(100),
    IN a_country VARCHAR(100),
    IN a_timezone VARCHAR(50))
BEGIN
    UPDATE Airports 
    SET
    airportName = a_airportName, 
    iataCode = a_iataCode, 
    city = a_city, 
    country = a_country, 
    timezone = a_timezone
    WHERE airportID = id; 
END //
DELIMITER ;

-- #############################
-- UPDATE flights
-- #############################
DROP PROCEDURE IF EXISTS sp_UpdateFlight;

DELIMITER //
CREATE PROCEDURE sp_UpdateFlight(
    IN id INT, 
    IN f_itineraryID INT,
    IN f_airlineID INT,
    IN f_bookingReferenceNum VARCHAR(100),
    IN f_flightNumber VARCHAR(10),
    IN f_departureAirport INT,
    IN f_arrivalAirport INT,
    IN f_departureTime DATETIME,
    IN f_arrivalTime DATETIME,
    IN f_cabinClass VARCHAR(50),
    IN f_notes VARCHAR (255))
BEGIN
    UPDATE Flights 
    SET
    itineraryID = f_itineraryID, 
    airlineID = f_airlineID, 
    bookingReferenceNum = f_bookingReferenceNum, 
    flightNumber = f_flightNumber, 
    departureAirport = f_departureAirport, 
    arrivalAirport = f_arrivalAirport, 
    departureTime = f_departureAirport, 
    arrivalTime = f_arrivalTime, 
    cabinClass = f_cabinClass, 
    notes = f_notes
    WHERE flightID = id; 
END //
DELIMITER ;

-- #############################
-- DELETE customers
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteCustomer;

DELIMITER //
CREATE PROCEDURE sp_DeleteCustomer(IN c_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Customers WHERE customerID = c_id;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in customers for id: ', c_id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;
    IF ROW_COUNT() > 0 THEN 
        SELECT CONCAT ('Successfully deleted customer with ID: ', c_id, ' and all related records') AS message;
    END IF;
    
END //
DELIMITER ;

-- #############################
-- DELETE passengers
-- #############################
DROP PROCEDURE IF EXISTS sp_DeletePassenger;

DELIMITER //
CREATE PROCEDURE sp_DeletePassenger(IN p_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
    DELETE FROM Passengers WHERE passengerID = p_id;
    
    IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in passengers for id: ', p_id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;
    
    IF ROW_COUNT() > 0 THEN 
        SELECT CONCAT ('Successfully deleted passenger with ID: ', p_id, ' and all related records') AS message;
    END IF;
END //
DELIMITER ;   

-- #############################
-- DELETE agents
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteAgent;

DELIMITER //
CREATE PROCEDURE sp_DeleteAgent(IN a_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
    DELETE FROM Agents WHERE agentID = a_id;
    
    IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in agents for id: ', a_id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;
    
    IF ROW_COUNT() > 0 THEN 
        SELECT CONCAT ('Successfully deleted agent with ID: ', a_id, ' and all related records') AS message;
    END IF;
END //
DELIMITER ;

-- #############################
-- DELETE destinations
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteDestination;

DELIMITER //
CREATE PROCEDURE sp_DeleteDestination(IN d_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Destinations WHERE destinationID = d_id;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in destinations for id: ', d_id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;
    IF ROW_COUNT() > 0 THEN 
        SELECT CONCAT ('Successfully deleted destination with ID: ', d_id, ' and all related records') AS message;
    END IF;
    
END //
DELIMITER ;

-- #############################
-- DELETE itineraryDestinations
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteItiDes;

DELIMITER //
CREATE PROCEDURE sp_DeleteItiDes(IN id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM ItineraryDestinations WHERE idID = id;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in ItineraryDestinations for id: ', id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;
    IF ROW_COUNT() > 0 THEN 
        SELECT CONCAT ('Successfully deleted ItineraryDestination with ID: ', id, ' and all related records') AS message;
    END IF;
    
END //
DELIMITER ;

-- #############################
-- DELETE Airlines
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteAirline;

DELIMITER //
CREATE PROCEDURE sp_DeleteAirline(IN id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Airlines WHERE airlineID = id;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Airlines for id: ', id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;
    IF ROW_COUNT() > 0 THEN 
        SELECT CONCAT ('Successfully deleted Airline with ID: ', id, ' and all related records') AS message;
    END IF;
    
END //
DELIMITER ;

-- #############################
-- DELETE Airports
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteAirport;

DELIMITER //
CREATE PROCEDURE sp_DeleteAirport(IN id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Airports WHERE airportID = id;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Airports for id: ', id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;
    IF ROW_COUNT() > 0 THEN 
        SELECT CONCAT ('Successfully deleted Airport with ID: ', id, ' and all related records') AS message;
    END IF;
    
END //
DELIMITER ;


-- #############################
-- DELETE Flights
-- #############################
DROP PROCEDURE IF EXISTS sp_DeleteFlight;

DELIMITER //
CREATE PROCEDURE sp_DeleteFlight(IN id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Flights WHERE flightID = id;

        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Flights for id: ', id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;
    IF ROW_COUNT() > 0 THEN 
        SELECT CONCAT ('Successfully deleted Flight with ID: ', id, ' and all related records') AS message;
    END IF;
    
END //
DELIMITER ;
