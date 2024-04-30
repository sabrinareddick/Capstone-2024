/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { CartContext } from "../store/CartContext";

const Product = ({ product }) => {
  const { id, thumbnail, category, title, price } = product;
  const { addToCart } = useContext(CartContext);

  return (
    <div className="transition-all duration-500 transform hover:translate-y-1">
      <div className="border border-[#e4e4e4] h-[300px] mb- relative overflow-hidden group">
        {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
        <div style={{ backgroundColor: '#e6e6e6' }} className="w-full h-full flex justify-center items-center cursor-pointer">
          <div className="w-[200px mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={thumbnail}
              alt=""
            ></img>
          </div>
        </div>
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button>
            <div
              className="flex justify-center items-center text-white w-12 h-12 bg-red-500"
              onClick={() => addToCart(product, id)}
            >
              <BsPlus className="text-3xl"></BsPlus>
            </div>
          </button>
          <Link
            to={`/product/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">{category}</div>
        <Link to={`product/${id}`}>
          <h2 className="font-semibold mb-1 hover:underline">{title}</h2>
        </Link>
        <div className="font-semibold">$ {price}</div>
      </div>
    </div>
  );
};

export default Product;
