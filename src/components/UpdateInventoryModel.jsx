import React, { useState } from "react";

const UpdateInventoryModel = ({ id, isOpen, onClose, onSubmit }) => {
  const [quantity, setQuantity] = useState("");

  /**
   * @description setting state for quantity
   * @param {*} event
   */
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  /**
   * @description This function is used to update the quantity of an item in the inventory.
   * @param {*} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(id, quantity);
    setQuantity("");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-medium mb-4">Enter New Quantity</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="quantity" className="block mb-2 font-medium">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className="border border-gray-300 rounded-lg py-2 px-3 w-full mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-2 hover:bg-gray-200 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UpdateInventoryModel;
