import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { categories } from "../data/data";
import { getProducts } from "../state/productSlice";

const AddProductForm = () => {
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const history = useHistory();
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
      setIsUploading(false);
      setUploadedImage(data.secure_url);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * @description this method is used to add product to the database(local storage)
   * @param {*} event
   * @returns  list of existing products with new product
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (uploadedImage.length !== 0) {
      const newProduct = {
        productId: uuid(),
        name: name,
        category: category,
        quantity: quantity,
        price: price,
        description: description,
        image: uploadedImage,
      };
      const updatedProducts = [...products, newProduct];

      localStorage.setItem("products", JSON.stringify(updatedProducts));
      history.push("/");
    }
  };

  return (
    <div
      className={`fixed top-6 left-0  w-full h-full bg-gray-500 bg-opacity-5 flex justify-center items-center`}
    >
      <div
        className="bg-white  px-6 py-0 rounded-lg"
        style={{ width: "380px" }}
      >
        <h2 className="text-xl font-bold mb-4 mt-4">Add Product</h2>
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
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Quantity"
              required
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              required
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <textarea
              id="description"
              name="description"
              required
              value={description}
              placeholder="Description"
              style={{ height: "80px" }}
              onChange={(event) => setDescription(event.target.value)}
              className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
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

          <div className="flex items-center justify-center mb-4">
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                uploadedImage.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {!isUploading ? (
                "Add Product"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
