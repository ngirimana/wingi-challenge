import Products from "./components/Products";
import Navigation from "./components/Navigation/Navigation";
import { Route } from "react-router-dom";
import { store } from "./state/store";
import { Provider } from "react-redux";
import AddProductForm from "./components/AddingProduct";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Route path="/" component={Products} exact />
      <Route path="/add-product" component={AddProductForm} />
      <Route path="/product/:id" component={ProductDetails} exact />
    </Provider>
  );
}

export default App;
