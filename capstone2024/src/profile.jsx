
//   // const [profilePicture, setProfilePicture] = useState(null);


//       {/* <div className="profile-form">
//         <h3>Profile Picture:</h3>
//         <input type="file" onChange={handleFileChange} accept="image/*" />
//       </div> */}
//     </div>
//   );
// };

import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from "./store/CartContext";
import './profile.css';

const Profile = () => {
  const { cart } = useContext(CartContext);
  const [user, setUser] = useState({
    user_first_name: '',
    user_last_name: '',
    user_email: '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [newLastName, setNewLastName] = useState('');
  const [newFirstName, setNewFirstName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  //const [orderList, setOrderList]=useState("");
  const [isLoading, setIsLoading]=useState(true);
  const apiServerRoot = localStorage.getItem("API_SERVER_ROOT");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(apiServerRoot + "/usersPool/currentUser", {
          method: 'GET',
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setNewLastName(userData.user_last_name);
          setNewFirstName(userData.user_first_name);
          setNewEmail(userData.user_email);
          setIsLoading(false);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchUser();
  }, [apiServerRoot]);

  const handleUpateSubmit = async (event) => {
    event.preventDefault();
    try {
      const updateUserData = {
        user_first_name: newFirstName,
        user_last_name: newLastName  ,
        user_email: newEmail 
      }
      const response = await fetch(apiServerRoot+"/usersPool/updateProfile", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({user_first_name, user_last_name})
        body: JSON.stringify(updateUserData)
      });
      if (response.ok) {
        const data = await response.json();
        window.location.reload();
      } else {s
        console.error('Updating name failed');
      }
        
    } catch (error) {
      console.error('Error updating user:', error);
    }
  
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(apiServerRoot+"/usersPool/updateProfile", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: newEmail })
      });

      if (response.ok) {
        const data = await response.json();
        window.location.reload();
      } else {
        console.error('Updating email failed');
      }
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(apiServerRoot+"/usersPool/updatePassword", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newPassword: newPassword, confirmPassword:confirmPassword })
      });

      if (response.ok) {
        const data = await response.json();
        window.location.reload();
      } else {
        console.error('Updating password failed');
      }
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleNameUpdate = () => {
    setEditingName(true);
  };

  const handleEmailUpdate = () => {
    setEditingEmail(true);
    setNewEmail(user.user_email);
  };

  const handlePasswordUpdate = () => {
    setEditingPassword(true);
  };

  const handleLastNameChange =async (event) => {
    setNewLastName(event.target.value)
  };
  const handleFistNameChange =async (event) => {
    const val = event.target.value;
   setNewFirstName(val);
  };
  const handleEmailChange = (event) => {

    setNewEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Edit Profile</h1>
      <div className="profile-details">
        <div>
          <h3>Name:</h3>
          <p id="name">{user.user_first_name} {user.user_last_name}</p>
          {editingName ? (
            <div>
              <input
                type="text"
                name="user_first_name"
                value={newFirstName}
                onChange={handleFistNameChange}
                required
              />
              <input
                type="text"
                name="user_last_name"
                value={newLastName}
                onChange={handleLastNameChange}
                required
              />
              <button onClick={handleUpateSubmit} type="submit">Save</button>
            </div>
          ) : (
            <div>
              <button onClick={handleNameUpdate}>Update Name</button>
            </div>
          )}
        </div>
        <div>
          <h3>Email:</h3>
          <p id="email">{user.user_email}</p>
          {editingEmail ? (
           <form>
              <input
                type="email"
                value={newEmail}
                onChange={handleEmailChange}
                required
              />
              <button onClick={handleUpateSubmit} type="submit">Save</button>
           </form>
          ) : (
            <div>
              <button onClick={handleEmailUpdate}>Update Email</button>
            </div>
          )}
        </div>
        <div>
          <h3>Password:</h3>
          <p id="password">{user.user_password}</p>
          {editingPassword ? (
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={handlePasswordChange}
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              <button onClick={handlePasswordUpdate} type="submit">Save</button>
            </form>
          ) : (
            <>
            <button onClick={handlePasswordUpdate}>Change Password</button>
            </>
          )}
        </div>
        <div>
          <h3>Previous Order Dates:</h3>
          {isLoading?<div/>:
          user.orders.map((order)=>{
            const items = JSON.parse(order.items_json);
            return (
              <p id="orderDates">{order.order_date}</p>
            )
          })
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;