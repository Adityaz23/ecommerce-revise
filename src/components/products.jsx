import { Link } from "react-router-dom";
// Passsing the products as props to the products component.
export default function Products({products}){
    return(
        <div className="product-grid">
          {/* looping thorugh the products */}
          {products.map((product) => (
            <div className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-card-image"
              />

              <div className="product-card-content">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-price">${product.price}</p>

                <div className="product-card-actions">
                  <Link className="btn btn-secondary">View Details</Link>
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
    )
}