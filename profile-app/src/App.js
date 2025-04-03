
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileList from "./Component/ProfileList";
import AdminPanel from "./Component/AdminPanel";
import MapComponent from "./Component/MapComponent";

const App = () => {
  const [profiles, setProfiles] = useState([
    { id: 1, name: "John Doe", image: "https://via.placeholder.com/150", description: "Software Engineer", address: "New York, USA" },
    { id: 2, name: "Jane Smith", image: "https://via.placeholder.com/150", description: "Designer", address: "London, UK" },
    { id: 3, name: "Emily Brown", image: "https://via.placeholder.com/150", description: "Doctor", address: "Paris, France" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  const fetchCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setSelectedCoordinates([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Address not found!");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleSummaryClick = (profile) => {
    fetchCoordinates(profile.address);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchTerm) ||
      profile.address.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Profile Mapping App</h1>

      {/* Search Input */}
      <div className="row mb-4">
        <div className="col-12">
          <input
            type="text"
            placeholder="Search by name or address..."
            className="form-control"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Admin Panel */}
      <AdminPanel profiles={profiles} setProfiles={setProfiles} />

      {/* Profile List */}
      <ProfileList profiles={filteredProfiles} onSummaryClick={handleSummaryClick} />

      {/* Map Component */}
      {selectedCoordinates && <MapComponent coordinates={selectedCoordinates} />}
    </div>
  );
};

export default App;
