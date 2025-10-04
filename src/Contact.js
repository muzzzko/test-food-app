import React, { useState } from 'react';
import { FaEnvelope, FaUser, FaComment, FaCheckCircle } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., sending data to a server
    setSubmitted(true);
  };

  return (
    <div className="contact">
      {submitted ? (
        <div className="contact-success">
          <div className="success-icon">
            <FaCheckCircle />
          </div>
          <h2>Thank You!</h2>
          <p>Your message has been submitted successfully.</p>
          <p>We'll get back to you soon!</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="send-another-btn"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <div className="contact-form-container">
          <div className="contact-header">
            <h2>Get in Touch</h2>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <FaUser className="label-icon" />
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Your full name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <FaEnvelope className="label-icon" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                <FaComment className="label-icon" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Tell us how we can help you..."
                rows="5"
                required
              />
            </div>
            
            <button type="submit" className="submit-btn">
              <FaEnvelope />
              Send Message
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Contact;
