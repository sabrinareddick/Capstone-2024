import React, { useState } from 'react';
import './register.css';

const Register = () => {

  const apiServerRoot = localStorage.getItem("API_SERVER_ROOT");
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(apiServerRoot+"/usersPool/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstName, lastName, email, password})
      });

      if (response.ok) {
        const data = await response.json();
        window.location.replace('/login');
      } else {
        console.error('Registration failed');
      }
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleCancel = () => {
    window.location.replace("/"); 
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="register-title">Create an Account and become an Elite Member!</h1>
        <form id="registrationForm" onSubmit={handleSubmit}>
          <div className="container">
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <hr />
            <label htmlFor="firstName" className="register-label">First Name:</label>
            <input type="text" id="firstName" placeholder="First Name" name="firstName" className="register-input"  value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

            <label htmlFor="lastName" className="register-label">Last Name:</label>
            <input type="text" id="lastName" placeholder="Last Name" name="lastName" className="register-input" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

            <label htmlFor="email" className="register-label"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" className="register-input" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="psw" className="register-label"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" className="register-input" value={password} onChange={(e) => setPassword(e.target.value)} required />

            <label htmlFor="password-repeat" className="register-label"><b>Repeat Password</b></label>
            <input type="password" placeholder="Repeat Password" name="password-repeat" className="register-input" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required />

            <label className="register-checkbox">
              <input type="checkbox" defaultChecked name="remember" /> Remember me
            </label>
            <p>By creating an account you agree to our <a href="#" style={{ color: "dodgerblue" }}>Terms & Privacy</a>.</p>

            <div className="clearfix">
              <button type="button" className="register-cancelbtn" onClick={handleCancel} >Cancel</button>
              <button type="submit" className="register-button">Register</button>
            </div>
          </div>
        </form>
        <br></br>
      </div>
    </div>
  );
}

export default Register;