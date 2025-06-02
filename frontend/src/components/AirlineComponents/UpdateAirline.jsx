import React, { useState } from "react";

const UpdateAirline = ({ airlines, backendURL, refreshAirline }) => {
  const [formData, setFormData] = useState({
    update_name: "",
    update_website: "",
    update_phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "update_id") {
      const selectedAirline = airlines.find(
        (air) => air.airlineID.toString() === value
      );

      if (selectedAirline) {
        setFormData((prev) => ({
          ...prev,
          update_id: value,
          update_name: selectedAirline.airlineName || "",
          update_website: selectedAirline.website || "",
          update_phone: selectedAirline.phone || "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          update_id: "",
          update_name: "",
          update_website: "",
          update_phone: "",
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
      const response = await fetch(backendURL + "/airlines/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Airline updated successfully.");
        refreshAirline();
      } else {
        console.error("Error updatinging airline.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <>
      <h2>New Airline</h2>

      <form className="cuForm" onSubmit={handleSubmit}>
        <label htmlFor="update_id">Airline to Update </label>
        <select
          name="update_id"
          id="update_id"
          value={formData.update_id}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {airlines &&
            airlines.map((airline) => (
              <option key={airline.airlineID} value={airline.airlineID}>
                {airline.airlineName}
              </option>
            ))}
        </select>

        <label htmlFor="update_name">Name </label>
        <input
          type="text"
          name="update_name"
          id="update_name"
          value={formData.update_name}
          onChange={handleChange}
        />

        <label htmlFor="update_website">Website </label>
        <input
          type="text"
          name="update_website"
          id="update_website"
          value={formData.update_website}
          onChange={handleChange}
        />
        <label htmlFor="update_phone">Phone </label>
        <input
          type="text"
          name="update_phone"
          id="update_phone"
          value={formData.update_phone}
          onChange={handleChange}
        />
        <input type="submit" />
      </form>
    </>
  );
};

export default UpdateAirline;
