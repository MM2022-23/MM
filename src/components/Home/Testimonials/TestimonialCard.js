import React from "react";
import "./Testimonials.css";

export default function TestimonialCard({
  testimony,
  image,
  name,
  work,
  location,
  ...rest
}) {
  return (
    <div className="testimonial-card" {...rest}>
      <div className="testimonial-image">
        <img src={image} alt="testimonial"/>
        <div className="testimonial-details">
          <p>{name}</p>
          <p>{work}</p>
          <p>{location}</p>
        </div>
      </div>
      <div className="testimonial-body">
        {testimony}
      </div>
    </div>
  );
}
