import React, { useState } from 'react';
import './floorPlans.css';

const WaitlistForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="waitlist-container">
      {submitted ? (
        <div>
            <br></br><br></br><br></br>
          <h2>Thank you for your interest and patience with us! You have sucessfully submitted your waitlist form!</h2>
        </div>
      ) : (
        <>
        <br></br><br></br><br></br>
        <h1>Sorry looks like we are fully occupied Please put your name down for or wait list and we will get back to you as soon as possible!</h1>
        <form onSubmit={handleSubmit} className="waitlist-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="name"
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="waitlist-input"
            />
          </label>
          <br />
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="waitlist-input"
            />
          </label>
          <br />
          <button type="submit" className="waitlist-button">Submit</button>
        </form>
        </>
      )}
    </div>
  );
};

export default WaitlistForm;