
import React from "react";

const ProfileList = ({ profiles, onSummaryClick }) => {
  return (
    <div className="container">
      <div className="row">
        {profiles.map((profile) => (
          <div key={profile.id} className="col-md-4">
            <div className="card">
              <div className="card-body">
                <img src={profile.image} alt={profile.name} className="card-img-top" />
                <h5 className="card-title">{profile.name}</h5>
                <p className="card-text">{profile.description}</p>
                <p className="card-text text-muted">{profile.address}</p>
                <button className="btn btn-primary" onClick={() => onSummaryClick(profile)}>
                  Show on Map
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileList;


