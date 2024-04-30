import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import { ProductContext } from "../store/ProductContext";
import Hero from "../components/Hero";
import Loader from "../components/Loader";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [filterByRating, setFilterByRating] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchBar, setSearchBar] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [foundProducts, setFoundProducts]=useState([]);
  const allProducts =  JSON.parse(localStorage.getItem("all_products")) || [];
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories()
      .then(() => setLoading(false)) 
      .catch(() => setLoading(false)); 
  }, []);
  const searchFieldKeyDownHandler=(e)=>{
    if (e.key==="Enter")
    {
      setFilteredProducts(foundProducts);
      return
    }
  }
  const searchFieldHandler=(e)=>{
    if (e.key==="Enter")
    {
      setFilteredProducts(foundProducts);
      return
    }
    setFoundProducts([]);
    const val = (e.target.value+"").toUpperCase();
    if(val==="")
    {
      return;
    }
    const list=[];
    for(let product of allProducts)
    {
      const title =(product.title+"").toUpperCase();
      if(title.indexOf(val)===0)
      {
        list.push(product);
      }
    }
    for(let product of allProducts)
    {
      const title =(product.title+"").toUpperCase();
      if(title.indexOf(val)>=0 && title.indexOf(val)!==0)
      {
        list.push(product);
      }
    }
    setFoundProducts(list);
  }
  const foundProductsListHandler=(e)=>{
    const idx = parseInt(e.target.value);
    const list = [foundProducts[idx]]
    setFilteredProducts(list);
  }
  const products = useContext(ProductContext);

  useEffect(() => {
    const filteredByRating = filterByRating
      ? products.filter((product) => product.rating >= filterByRating)
      : products;

    let sortedProducts = [...filteredByRating];
    if (sortBy === "price-low-to-high") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-to-low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
  }, [products, sortBy, filterByRating]);

  if (loading || products.length === 0 || categories.length === 0) {
    return <Loader />; 
  }

  return (
    <div style={{ backgroundColor: '#f0f0f0'  }}>
      <Hero />
      <section className="py-7">
          <div className="container mx-auto relative" >
            <h1 className="text-3xl font-semibold text-center mb-10 text-gray-800 text-primary">
              Explore Products
            </h1>
            <span className="absolute left-1/2 transform -translate-x-1/2 top-10 bottom-0 w-1/4 h-0.5 bg-red-500"></span>
            <div className="flex justify-end space-x-4 mb-8">
              <div className="flex items-center">
                <label htmlFor="searchField" className="text-lg font-semibold mr-2">
                  Search All:
                </label>
                <input onChange={searchFieldHandler} onKeyDown={searchFieldKeyDownHandler}></input>
               

                <label htmlFor="sortBy" className="text-lg font-semibold mr-2">
                  Sort By:
                </label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  <option value="default" className="cursor-pointer">
                    Default
                  </option>
                  <option value="price-low-to-high" className="cursor-pointer">
                    Price: Low to High
                  </option>
                  <option value="price-high-to-low" className="cursor-pointer">
                    Price: High to Low
                  </option>
                </select>
              </div>
             
              <div className="flex items-center">
                <label
                  htmlFor="filterByRating"
                  className="text-lg font-semibold mr-2"
                >
                  Filter By Rating:
                </label>
                <select
                  id="filterByRating"
                  value={filterByRating || ""}
                  onChange={(e) =>
                    setFilterByRating(Number(e.target.value) || null)
                  }
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                >
                  <option value="">All Ratings</option>
                  <option value="4">4 Stars & Above</option>
                  <option value="3">3 Stars & Above</option>
                  <option value="2">2 Stars & Above</option>
                  <option value="1">1 Star & Above</option>
                </select>
              </div>
              
            </div>
            {foundProducts.length===0?<div/>:
            <select
                  id="foundProductsList"
                  size="5"
                  onChange={foundProductsListHandler}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 cursor-pointer"
                  >{
                    foundProducts.map((p,i)=> 
                    <option key={i} value={i}>{p.title}</option>)
                  }</select>}
          </div>
        <div style={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '40px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12 max-w-screen-xl mx-auto">
            {filteredProducts.map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
