import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const categories = [
      "groceries",
      "home-decoration",
      "furniture",
      "lighting",
      "sunglasses",
      "womens-jewellery",
    ];

    const fetchProducts = async () => {
      try {
        const fetchedProducts = [];

        for (const category of categories) {
          const storedProducts = JSON.parse(
            localStorage.getItem(`products_${category}`)
          );

          if (storedProducts) {
            fetchedProducts.push(...storedProducts);
          } else {
            const response = await fetch(
              `https://dummyjson.com/products/category/${category}`
            );

            const data = await response.json();
            fetchedProducts.push(...data.products);

            localStorage.setItem(
              `products_${category}`,
              JSON.stringify(data.products)
            );
          }
        }
        setProducts(fetchedProducts);
        localStorage.setItem("products", JSON.stringify(fetchedProducts));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const fetchedProducts = [];
            const response = await fetch(
              `https://dummyjson.com/products`
            );
            const data = await response.json();

            localStorage.setItem(
              `all_products`,
              JSON.stringify(data.products)
            );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
    fetchAllProducts();
  }, []);

  return (
    <div className="product-provider-container">
      <ProductContext.Provider value={products}>
        {children}
      </ProductContext.Provider>
    </div>
  );
};
