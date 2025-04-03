import React, { useState } from "react";

const AdminPanel = ({ profiles, setProfiles }) => {
  const [formData, setFormData] = useState({ id: null, name: "", image: "", description: "", address: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setProfiles((prev) =>
        prev.map((profile) => (profile.id === formData.id ? formData : profile))
      );
      setIsEditing(false);
    } else {
      setProfiles((prev) => [...prev, { ...formData, id: Date.now() }]);
    }

    setFormData({ id: null, name: "", image: "", description: "", address: "" });
  };

  const handleEdit = (profile) => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id));
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title">Admin Panel</h2>
        
                        {/* Form for Adding/Editing Profiles */}
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control mb-2"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="form-control mb-2"
            value={formData.image}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="form-control mb-2"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="form-control mb-2"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="btn btn-success">
            {isEditing ? "Update Profile" : "Add Profile"}
          </button>
        </form>

           
                  {/* Profile Cards with Edit and Delete Functionality */}
        <div className="container">
          <div className="row">
            {profiles.map((profile) => (
              <div key={profile.id} className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{profile.name}</h5>
                    <p className="card-text">{profile.description}</p>
                    <p className="card-text text-muted">{profile.address}</p>
                    <div>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(profile)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(profile.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
