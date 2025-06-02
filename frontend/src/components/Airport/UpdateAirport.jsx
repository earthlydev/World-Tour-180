import React, { useState } from "react";

const UpdateAirport = ({ airports, backendURL, refreshAirport }) => {
  const [formData, setFormData] = useState({
    update_id: "",
    update_name: "",
    update_iata: "",
    update_city: "",
    update_country: "",
    update_timezone: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "update_id") {
      const selectedAirport = airports.find(
        (air) => air.airportID.toString() === value
      );

      if (selectedAirport) {
        setFormData((prev) => ({
          ...prev,
          update_id: value,
          update_name: selectedAirport.airportName || "",
          update_iata: selectedAirport.iataCode || "",
          update_city: selectedAirport.city || "",
          update_country: selectedAirport.country || "",
          update_timezone: selectedAirport.timezone || "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          update_id: "",
          update_name: "",
          update_iata: "",
          update_city: "",
          update_country: "",
          update_timezone: "",
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

    try {
      const response = await fetch(backendURL + "/airports/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Airport updated successfully.");
        refreshAirport();
      } else {
        console.error("Error updatinging airport.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <>
      <h2>Update an Airport</h2>

      <form className="cuForm" onSubmit={handleSubmit}>
        <label htmlFor="update_id">Airport to Update </label>
        <select
          name="update_id"
          id="update_id"
          value={formData.update_id}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {airports.map((airport) => (
            <option key={airport.id} value={airport.id}>
              {airport.airportName}
            </option>
          ))}
        </select>

        <label htmlFor="update_name"> Name </label>
        <input
          type="text"
          name="update_name"
          id="update_name"
          value={formData.update_name}
          onChange={handleChange}
        />

        <label htmlFor="iata">IATA Code </label>
        <input
          type="text"
          name="update_iata"
          id="update_iata"
          value={formData.update_iata}
          onChange={handleChange}
        />

        <label htmlFor="update_city">City </label>
        <input
          type="text"
          name="update_city"
          id="update_city"
          value={formData.update_city}
          onChange={handleChange}
        />

        <label htmlFor="update_country">Country </label>
        <input
          type="text"
          name="update_country"
          id="update_country"
          value={formData.update_country}
          onChange={handleChange}
        />

        <label htmlFor="update_timezone">Timezone </label>
        <input
          type="text"
          name="update_timezone"
          id="update_timezone"
          value={formData.update_timezone}
          onChange={handleChange}
        />

        <input type="submit" />
      </form>
    </>
  );
};

export default UpdateAirport;
