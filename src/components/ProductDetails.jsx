import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import UpdateInventoryModel from "./UpdateInventoryModel";
import UpdateProductModal from "./UpdateProduct";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../state/productSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isUpdateInventoryOpen, setIsUpdateInventoryOpen] = useState(false);
  const [isUpdateProductOpen, setIsUpdateProductOpen] = useState(false);
  const history = useHistory();
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const onOpenUpdateInventoryModel = () => {
    setIsUpdateInventoryOpen(true);
  };
  const onCloseUpdateInventoryModel = () => {
    setIsUpdateInventoryOpen(false);
  };
  const onOpenUpdateProductModel = () => {
    setIsUpdateProductOpen(true);
  };
  const onCloseUpdateProductModel = () => {
    setIsUpdateProductOpen(false);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  /**
   * @description deleting a single product from product list and after stored them in local storage
   * @return {void} list of products remaining
   */
  const deleteProduct = () => {
    const remainingProducts = products.filter(
      (product) => product.productId !== id
    );
    localStorage.setItem("products", JSON.stringify(remainingProducts));
    history.push("/");
  };

  /**
   * @description updating inventory stock for single product
   * @param {string} id
   * @param {number} newQuantity
   * @return {object} object all products with update products information
   */

  const updateInventory = (id, newQuantity) => {
    let updatedProducts = products.map((product) => {
      if (product.productId === id) {
        product = { ...product, quantity: newQuantity };
      }
      return product;
    });
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    history.push(`/product/${id}`);
    dispatch(getProducts());
    onCloseUpdateInventoryModel();
  };

  /**
   * @description updating product stock for information
   * @param {string} id
   * @param {number} newQuantity
   * @return {array} list of products remaining
   */

  const updateProduct = (id, newData) => {
    const updatedProducts = products.map((product) => {
      if (product.productId === id) {
        product = { ...product, ...newData, productId: id };
      }
      return product;
    });
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    dispatch(getProducts());
    history.push(`/product/${id}`);
  };

  /**
   * @description fetching single product information
   */
  useEffect(() => {
    if (products.length > 0) {
      const targetProduct = products.find(
        (product) => product.productId === id
      );
      if (targetProduct) {
        setProduct(targetProduct);
      }
    }
  }, [id, products]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {product && (
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full md:w-1/2 lg:w-2/5 md:pr-8">
            <img src={product.image} alt={product.name} className="w-full" />
          </div>
          <div className="w-full md:w-1/2 lg:w-3/5 mt-8 md:mt-0">
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            <p className="text-lg mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <span className="text-gray-600 mr-2">Category:</span>
              <span className="text-gray-800">{product.category}</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-gray-600 mr-2">Quantity:</span>
              <span className="text-gray-800">{product.quantity}</span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-gray-600 mr-2">Price:</span>
              <span className="text-gray-800">
                ${parseFloat(product.price).toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between mt-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2"
                onClick={deleteProduct}
              >
                Delete Product
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2"
                onClick={onOpenUpdateProductModel}
              >
                Update Product
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={onOpenUpdateInventoryModel}
              >
                Update Inventory
              </button>
            </div>
          </div>
          <UpdateInventoryModel
            id={id}
            isOpen={isUpdateInventoryOpen}
            onClose={onCloseUpdateInventoryModel}
            onSubmit={updateInventory}
          />
          <UpdateProductModal
            product={product}
            onClose={onCloseUpdateProductModel}
            isOpen={isUpdateProductOpen}
            onSubmit={updateProduct}
            id={id}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
