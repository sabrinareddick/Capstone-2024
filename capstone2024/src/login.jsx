import React, {useContext} from 'react';
import { CartContext } from "./store/CartContext";
import './login.css';

const Login = () => {
   const apiServerRoot = localStorage.getItem("API_SERVER_ROOT");
    const { setInitialCart } = useContext(CartContext);

    const login = async () => {
      const user = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        remember: document.getElementById("remember").checked
      };
      const resp = await fetch(apiServerRoot+"/usersPool/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const json = await resp.json();
      alert(json.message);
      if (json.status === 1) { 
        sessionStorage.setItem("currentUser", JSON.stringify(json.user));
        if ((json.user.users_shopping_cart+"").charAt(0)=="[")
        {
          const cart = JSON.parse(json.user.users_shopping_cart);
          localStorage.setItem("cart", JSON.stringify(cart));
          setInitialCart(cart);
        }
      window.location.replace("/Shop");
      }
    const getCart = await fetch(apiServerRoot+"/usersPool/getCart")
    };

   return (
     <>
     <br></br>
       <div className="login-container login-background" >
         <div>
           <h1 style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }} >Welcome Back, We Missed You</h1>
           <form onSubmit={(e) => e.preventDefault()}>
             <div className="container">
               <label htmlFor="username" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}><b>Username</b></label>
               <input type="text" placeholder="Enter Username" name="username" id="username" required />

               <label htmlFor="password" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}><b>Password</b></label>
               <input type="password" placeholder="Enter Password" name="password" id="password" required />

               <button type="submit" onClick={login} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>
             </div><br></br>

               <div className="container" style={{ display: "flex", alignItems: "center", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                 <input type="checkbox" defaultChecked name="remember" id="remember" style={{ marginRight: "8px" }} />
                 <label htmlFor="remember">Remember me</label>
               </div><br></br>

             <div className="container" >
               <a href="/Register"><button type="button" className="register">Register</button></a>
               <br />
             </div>
           </form>
         </div>
       </div>
     </>
   );
}

export default Login;



