// Citation: copilot.microsoft.com
// Prompt: How do i format date strings to match the input tag
import React, { useState } from "react";

const UpdateFlight = ({
  flights,
  itineraries,
  airlines,
  airports,
  backendURL,
  refreshFlight,
}) => {
  const [formData, setFormData] = useState({
    update_id: "",
    update_i_id: "",
    update_a_id: "",
    update_bookingNum: "",
    update_flightNum: "",
    update_depAirport: "",
    update_arrAirport: "",
    update_depTime: "",
    update_arrTime: "",
    update_cabinClass: "",
    update_notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "update_id") {
      const selectedFlight = flights.find(
        (air) => air.flightID.toString() === value
      );

      const formatForInput = (sqlDateTime) => {
        if (!sqlDateTime) return "";
        const date = new Date(sqlDateTime);
        return date.toISOString().slice(0, 16);
      };

      if (selectedFlight) {
        setFormData((prev) => ({
          ...prev,
          update_id: value,
          update_i_id: selectedFlight.itineraryID || "",
          update_a_id: selectedFlight.airlineID || "",
          update_bookingNum: selectedFlight.bookingReferenceNum || "",
          update_flightNum: selectedFlight.flightNumber || "",
          update_depAirport: selectedFlight.departureAirport || "",
          update_arrAirport: selectedFlight.arrivalAirport || "",
          update_depTime:formatForInput(selectedFlight.departureTime) || "",
          update_arrTime: formatForInput(selectedFlight.arrivalTime) || "",
          update_cabinClass: selectedFlight.cabinClass || "",
          update_notes: selectedFlight.notes || "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          update_id: "",
          update_i_id: "",
          update_a_id: "",
          update_bookingNum: "",
          update_flightNum: "",
          update_depAirport: "",
          update_arrAirport: "",
          update_depTime: "",
          update_arrTime: "",
          update_cabinClass: "",
          update_notes: "",
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatForSQL = (datetimeLocalString) => {
      if (!datetimeLocalString) return null;
      const date = new Date(datetimeLocalString);
      return date.toISOString().slice(0, 19).replace("T", " ");
    };

    const payload = {
      ...formData,
      update_i_id: parseInt(formData.update_i_id, 10),
      update_a_id: parseInt(formData.update_a_id, 10),
      update_depAirport: parseInt(formData.update_depAirport, 10),
      update_arrAirport: parseInt(formData.update_arrAirport, 10),
      update_depTime: formatForSQL(formData.update_depTime),
      update_arrTime: formatForSQL(formData.update_arrTime),
    };

    try {
      const response = await fetch(backendURL + "/flights/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Flight updated successfully.");
        refreshFlight();
      } else {
        console.error("Error creating flight.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <>
      <h2>New Flight</h2>

      <form className="cuForm" onSubmit={handleSubmit}>
        <label htmlFor="update_id">Select a Booking </label>
        <select
          name="update_id"
          id="update_id"
          value={formData.update_id}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {flights.map((flight) => (
            <option key={flight.id} value={flight.flightID}>
              {flight.bookingReferenceNum}
            </option>
          ))}
        </select>

        <label htmlFor="update_i_id">Select an Itinerary </label>
        <select
          name="update_i_id"
          id="update_i_id"
          value={formData.update_i_id}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {itineraries.map((itinerary) => (
            <option key={itinerary.id} value={itinerary.itineraryID}>
              {itinerary.title}
            </option>
          ))}
        </select>

        <label htmlFor="update_a_id">Select an Airline </label>
        <select
          name="update_a_id"
          id="update_a_id"
          value={formData.update_a_id}
          onChange={handleChange}
          required
        >
          <option value="">Select an Airline</option>
          {airlines.map((airline) => (
            <option key={airline.airlineID} value={airline.airlineID}>
              {airline.airlineName}
            </option>
          ))}
        </select>

        <label htmlFor="update_bookingNum">Booking Reference Number</label>
        <input
          type="text"
          name="update_bookingNum"
          id="update_bookingNum"
          value={formData.update_bookingNum}
          onChange={handleChange}
          required
        />

        <label htmlFor="update_flightNum">Flight Number </label>
        <input
          type="text"
          name="update_flightNum"
          id="update_flightNum"
          value={formData.update_flightNum}
          onChange={handleChange}
        />

        <label htmlFor="update_depAirport">Select The Depature Airport </label>
        <select
          name="update_depAirport"
          id="update_depAirport"
          value={formData.update_depAirport}
          onChange={handleChange}
        >
          <option value="">Select an Airport</option>
          {airports.map((airport) => (
            <option key={airport.airportID} value={airport.airportID}>
              {airport.airportName}
            </option>
          ))}
        </select>

        <label htmlFor="update_arrAirport">Select The Arrival Airport</label>
        <select
          name="update_arrAirport"
          id="update_arrAirport"
          value={formData.update_arrAirport}
          onChange={handleChange}
        >
          <option value="">Select an Airport</option>
          {airports.map((airport) => (
            <option key={airport.airportID} value={airport.airportID}>
              {airport.airportName}
            </option>
          ))}
        </select>

        <label htmlFor="update_depTime">Depature Time </label>
        <input
          type="datetime-local"
          name="update_depTime"
          id="update_depTime"
          value={formData.update_depTime}
          onChange={handleChange}
        />

        <label htmlFor="update_arrTime">Arrival Time </label>
        <input
          type="datetime-local"
          name="update_arrTime"
          id="update_arrTime"
          value={formData.update_arrTime}
          onChange={handleChange}
        />

        <label htmlFor="update_cabinClass">Cabin Class </label>
        <input
          type="text"
          name="update_cabinClass"
          id="update_cabinClass"
          value={formData.update_cabinClass}
          onChange={handleChange}
        />

        <label htmlFor="update_notes">Notes </label>
        <input
          type="text"
          name="update_notes"
          id="update_notes"
          value={formData.update_notes}
          onChange={handleChange}
        />

        <input type="submit" />
      </form>
    </>
  );
};

export default UpdateFlight;
