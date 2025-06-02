// Citation: copilot.microsoft.com
// Prompt: How do I prepopulate fields with previous row information?
import React, {useState} from 'react';

const UpdateDestination = ({ destinations, backendURL, refreshDestination }) => {
    const [formData, setFormData] = useState({
        update_name: '',
        update_country: '',
        update_timezone: '',
        update_visaRequired: false,
        update_currency: '',
        update_language: '',
        update_description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'update_id') {
            const selectedDestination = destinations.find(
                (dest) => dest.destinationID.toString() === value
            );

    if (selectedDestination) {
      setFormData((prev) => ({
        ...prev,
        update_id: value,
        update_country: selectedDestination.country || '',
        update_timezone: selectedDestination.timezone || '',
        update_visaRequired: selectedDestination.visaRequired || false,
        update_currency: selectedDestination.currency || '',
        update_language: selectedDestination.language || '',
        update_description: selectedDestination.description || ''
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        update_id: '',
        update_country: '',
        update_timezone: '',
        update_visaRequired: false,
        update_currency: '',
        update_language: '',
        update_description: ''
      }));
    }
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }
};

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(backendURL + '/destinations/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Destination updated successfully.');
                refreshDestination();
            } else {
                console.error("Error updating destination.");
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    return (
        <>
        <h2>Update a Destination</h2>
        <form className='cuForm' onSubmit={handleSubmit}>
            <label htmlFor="update_id">Destination to Update </label>
            <select
                name="update_id"
                id="update_id"
                value={formData.update_id}
                onChange={handleChange}
            >
                <option value="">Select a Destination</option>
                {destinations && destinations.map((destination) => (
                    <option key={destination.destinationID} value={destination.destinationID}>
                       {destination.name}
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
            
            <label>Visa Required</label>
            <input
                type="radio"
                id="visaYes"
                name="update_visaRequired"
                checked={formData.update_visaRequired === true}
                onChange={() => setFormData({...formData, update_visaRequired: true})}
            />
            <label htmlFor="visaYes">Yes </label>
            <input
                type="radio"
                id="visaNo"
                name="update_visaRequired"
                checked={formData.update_visaRequired === false}
                onChange={() => setFormData({...formData, update_visaRequired: false})}
            />
            <label htmlFor="visaNo">No </label>
            
            <label htmlFor="update_currency">Currency </label>
            <input
                type="text"
                name="update_currency"
                id="update_currency"
                value={formData.update_currency}
                onChange={handleChange}
            />

            <label htmlFor="update_language">Language </label>
            <input
                type="text"
                name="update_language"
                id="update_language"
                value={formData.update_language}
                onChange={handleChange}
            />
            
            <label htmlFor="update_description">Description </label>
            <input
                type="text"
                name="update_description"
                id="update_description"
                value={formData.update_description}
                onChange={handleChange}
            />

            <input type="submit" />
        </form>
        </>
    );
};

export default UpdateDestination;
