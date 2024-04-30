import React, { useContext } from "react";
import { CartContext } from "./store/CartContext";
import "./logout.css";

const Logout = () => {
  const { cart, clearCart } =
  useContext(CartContext);
   const apiServerRoot = localStorage.getItem("API_SERVER_ROOT");

  const logout = async () => {
    const resp = await fetch(apiServerRoot+"/usersPool/logout");
    const json = await resp.json();
    alert(json.message);
    if (json.status === 200) {
      clearCart();
      sessionStorage.removeItem("currentUser");
      window.location.replace("/");
     // window.location.replace("/profile.html");
    }
  };
  
  const saveCart = async ()=>{
    const resp = await fetch(apiServerRoot+"/usersPool/saveCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cart)
    });
    const json = await resp.json();
    alert(json.message);
  }
  return (
    <div className="logout-container logout-background">
    <div>
      <h1 className="logout-title" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }} >Hope You Come Back Soon!!</h1>
      <div className="logout-buttons">
        <button onClick={saveCart}>Save Shopping Cart</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  </div>
  );
}

export default Logout;
