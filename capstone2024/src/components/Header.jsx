import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";
import { CartContext } from "../store/CartContext";
import logo from "../img/logo.svg";
import { SidebarContext } from "../store/SidebarContext";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const currentUser=sessionStorage.getItem("currentUser");
  const userTemp=currentUser?JSON.parse(currentUser):{user_id:0}
  const [user, setUser]=useState(userTemp);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  return (
    <header className={`py-6 bg-black text-white fixed w-full z-10 transition-all ${isActive ? 'shadow-md' : ''}`} style={{ paddingLeft: '20px', paddingRight: '20px' }}>
      <div className="container flex mx-auto items-center justify-between h-full">
        <ul className="flex items-center space-x-6">
          <li><a href="/" className="hover:text-red-500">Home</a></li>
          <li><a href="/Shop" className="hover:text-red-500">Shop</a></li>
          <li><a href="/Blog" className="hover:text-red-500">Blog</a></li>
          <li><a href="/Calendar" className="hover:text-red-500">Calendar</a></li>
          <li><a href="/FloorPlans" className="hover:text-red-500">Floor Plans</a></li>
         {user.user_id>0?
         <>
          <li><a href="/logout" className="hover:text-red-500">Log out</a></li>
          <li><a href="/profile" className="hover:text-red-500">Profile</a></li>
          </>
          :
          <>
          <li><a href="/login" className="hover:text-red-500">Log in</a></li>
          <li><a href="/Register" className="hover:text-red-500">Register</a></li></>
         }
        </ul>
        <div className="cursor-pointer flex relative" onClick={() => setIsOpen(!isOpen)}>
          <BsBag className="text-2xl" />
          <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;