import Products from "../components/products";
import { getProducts } from "../data/products";

export default function HomePage() {
  const products = getProducts();
  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-title">Welcome to Amazon</h1>
        <p className="home-subtitle">
          Discover great products at unbeatable prices
        </p>
      </div>
      <div className="container">
        <h2 className="page-title">Our Products</h2>
        {/* Products Components*/}

        <Products products={products} key={products.id} />
      </div>
    </div>
  );
}
