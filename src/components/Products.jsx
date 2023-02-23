import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../state/productSlice";
import Product from "./ProductItem";
import { categories } from "../data/data";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [availableProducts, setAvailableProducts] = useState([]);
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  /**
   * @description this is to fetch products from local storage when page is loading
   * @returns {Array} products available from local storage
   */

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  /**
   * @description filtering products based on category
   * @returns {Array} filtered products

   */
  useEffect(() => {
    if (filter === "all") {
      setAvailableProducts(products);
    } else {
      const filteredItems = products.filter((item) => item.category === filter);
      setAvailableProducts(filteredItems);
    }
  }, [filter, products]);

  /**
   * @description search for products that match with provided characters
   * @param {*} searchTerm 
   * @returns {Array} found products

   */

  const handleSearch = (searchTerm) => {
    if (searchTerm.length !== 0) {
      const foundProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setAvailableProducts(foundProducts);
    } else {
      setAvailableProducts(products);
    }
  };

  return (
    <>
      <div className="flex flex-row  items-center justify-center mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative flex items-center">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="search"
              className="w-full px-20 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              style={{ width: "300px" }}
              placeholder="Search product"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch(e.target.value);
              }}
            />
          </div>

          <div
            className="ml-0 md:ml-4 "
            style={{
              width: "300px",
            }}
          >
            <label htmlFor="filter" className="sr-only">
              Filter
            </label>
            <select
              id="filter"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        {availableProducts.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-20 items-center justify-center">
            {availableProducts.map((product) => (
              <Link to={`product/${product.productId}`} key={product.productId}>
                <Product {...product} />
              </Link>
            ))}
          </div>
        ) : (
          <h1 className="text-3xl font-bold  mt-800">No products available.</h1>
        )}
      </div>
    </>
  );
};

export default Products;
