import React, { Component } from "react";
import "../App.css";

class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: []
    };
  }

  componentDidMount() {
    fetch("/api/customers")
      .then(res => res.json())
      .then(customers =>
        this.setState({ customers }, () => console.log(customers))
      );
  }
  render() {
    return (
      <div className="Customers">
        <h3>Customers from ExpressJS Server</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
            </tr>
          </thead>
          <tbody>
            {this.state.customers.map(customer => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.firstname}</td>
                <td>{customer.lastname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Customers;
