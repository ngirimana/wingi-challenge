import React, { useState } from "react";
import axios from "axios";
import { categories } from "../data/data";

function UpdateProductModal({ product, isOpen, onClose, onSubmit, id }) {
  const [category, setCategory] = useState(product.category);
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);
  const [name, setName] = useState(product.name);
  const [isUploading, setIsUploading] = useState(false);

  /**
   * @description This function is used to update the single product using found used id and after updating it closes the update model.
   * @param {*} event 
   * @param {*} id 

   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedProduct = {
      id: product.id,
      name,
      category,
      quantity,
      price,
      description,
      image: image,
    };
    onSubmit(id, updatedProduct);
    onClose();
  };

  /**
   * @description This function is used to upload product image to cloudinary before adding it to the database(local storage)
   * after it add image url to image state.
   * @param {*} event
   * @returns  image url
   */
  const uploadImage = async (event) => {
    setIsUploading(true);
    const imageData = new FormData();
    imageData.append("file", event.target.files[0]);
    imageData.append("upload_preset", "wingi-app");
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/kuranga/image/upload",
        imageData
      );
      setImage(data.secure_url);
      setIsUploading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`fixed top-4 left-0  w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div
        className="bg-white w-1/2 px-4 py-2  rounded-lg"
        style={{ width: "380px" }}
      >
        <h2 className="text-xl font-bold mb-4">Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="product name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <select
              id="category"
              name="category"
              placeholder="Category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="quantity"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              value={description}
              style={{ height: "80px" }}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              Choose Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(event) => uploadImage(event)}
              accept="images/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hidden"
            />
          </div>
          <div className="flex justify-between mb-4">
            <button
              style={{ width: "155px" }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 "
              type="submit"
            >
              {!isUploading ? (
                "Update Product"
              ) : (
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 016.478 13H4.555A9.956 9.956 0 004 16.708V17z"
                  />
                </svg>
              )}
            </button>
            <button
              style={{ width: "155px" }}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProductModal;
