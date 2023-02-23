import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-gray-300 hover:text-white">
              Wingi E-Commerce
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/add-product"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-600 hover:bg-gray-700"
            >
              Add Product
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
