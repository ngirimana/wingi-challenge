import React from "react";

function Product({ name, quantity, image, category, price, description }) {
  return (
    <div className="border border-gray-300 shadow-lg rounded-md p-4 flex flex-col items-center">
      <img
        className="w-48 h-48 object-cover mb-4"
        style={{
          width: "200px",
          height: "200px",
        }}
        src={image}
        alt={description}
      />
      <div className="text-2xl font-bold text-gray-900">{name}</div>
      <div className="text-base font-medium text-gray-900">
        {description.slice(0, 50)}...
      </div>
      <div class="container flex items-center justify-between">
        <div class="text-base font-medium text-gray-500 mb-2">
          Category:{category}
        </div>
        <div class="text-base font-medium text-gray-500 mb-2">
          Qty: {quantity} items
        </div>
      </div>

      <div className="text-2xl font-bold text-gray-900">
        ${parseFloat(price).toFixed(2)}
      </div>
    </div>
  );
}

export default Product;
