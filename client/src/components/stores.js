import React, { Component } from "react";
import "../App.css";

class Stores extends Component {
  constructor() {
    super();
    this.state = {
      stores: []
    };
  }

  componentDidMount() {
    fetch("/api/stores")
      .then(res => res.json())
      .then(stores => this.setState({ stores }, () => console.log(stores)));
  }
  render() {
    return (
      <div className="Stores">
        <h3>Stores from KeepSlip Database</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Store Name</th>
              <th>Store Detail</th>
              <th>Contract Address</th>
              <th>Contract ABI</th>
            </tr>
          </thead>
          <tbody>
            {this.state.stores.map(store => (
              <tr key={store.id}>
                <td>{store.id}</td>
                <td>{store.StoreName}</td>
                <td>{store.StoreDetail}</td>
                <td>{store.ContractAddress}</td>
                <td>{store.ContractABI}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Stores;
