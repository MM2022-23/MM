import React from "react";
import "./Maintenance.css";
const Maintenance = () => {
  return (
    <div class="container maintenance-container">
      <div class="maintenance-icon">
        <i class="fas fa-tools"></i>
      </div>
      <div class="maintenance-title">Site Under Maintenance</div>
      <div class="maintenance-text">
        We apologize for the inconvenience. We are performing scheduled
        maintenance. Please check back later.
      </div>
    </div>
  );
};

export default Maintenance;
