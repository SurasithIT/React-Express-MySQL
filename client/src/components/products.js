import React, { Component } from "react";
import "../App.css";

class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    fetch("/api/products")
      .then(res => res.json())
      .then(products =>
        this.setState({ products }, () => console.log(products))
      );
  }
  render() {
    return (
      <div className="Customers">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Warranty Time</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.ProductName}</td>
                <td>{product.Price}</td>
                <td>{product.WarrantyTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Products;
