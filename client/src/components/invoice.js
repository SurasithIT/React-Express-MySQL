import React, { Component } from "react";

export default class Invoice extends Component {
  constructor() {
    super();
    this.state = {
      storeId: 1,
      branchId: 1,
      store: {},
      invoiceId: "",
      invoice: [],
      phoneNumber: "",
      user: {},
      error: null
    };
  }
  componentDidMount = () => {
    fetch(`/api/stores/${this.state.storeId}/${this.state.branchId}`)
      .then(res => res.json())
      .then(store => {
        this.setState({
          store: store[0]
        });
      });
    //   .catch(error =>
    //     this.setState({
    //       error: error
    //     })
    //   );
  };

  getInvoice = () => {
    fetch(`/api/invoiceFromStore/${this.state.invoiceId}`)
      .then(res => res.json())
      .then(invoice => {
        this.setState({
          invoice: invoice
        });
      });
  };

  getUser = () => {
    fetch(`/api/customers/${this.state.phoneNumber}`)
      .then(res => res.json())
      .then(user => {
        this.setState({
          user: user[0]
        });
      });
  };

  addInvoice = () => {
    var data = {
      user_id: this.state.user.id,
      store_id: this.state.storeId,
      branch_id: this.state.branchId,
      invoice_id: this.state.invoiceId,
      KeepSlip_invoice_id: `S${this.state.storeId}B${this.state.branchId}I${this.state.invoiceId}`
    };

    const options = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

    fetch("http://localhost:5000/api/addInvoice", options)
      .then(response => {
        // console.log(request);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then(data => console.log("data", data))
      .catch(error => this.setState({ error }));

    //   console.log("Data set", data);
    //   fetch("/api/addInvoice", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: data
    //   })
    //     .then(body => console.log("bddd", body))
    //     .then((res, err) => {
    //       if (err) {
    //         throw new Error("Bad response from server");
    //       }
    //       console.log("Res", res);
    //     })
    //     .then(data => {
    //       console.log("Data", data);
    //     });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <h1>Keep your slip into Blockchain!!</h1>
        <h3>{this.state.store.StoreName}</h3>
        <h4>{this.state.store.StoreDetail}</h4>
        <h4>Branch : {this.state.store.BranchName}</h4>
        <h4>{this.state.store.BranchAddress}</h4>

        <h4>
          Add Invoice ID :{" "}
          <input
            type="text"
            name="invoiceId"
            value={this.state.invoiceId}
            onChange={this.handleChange}
          />{" "}
          <button onClick={this.getInvoice}>Get</button>
        </h4>

        <h4>
          Add Phone Number of User :{" "}
          <input
            type="text"
            name="phoneNumber"
            value={this.state.phoneNumber}
            onChange={this.handleChange}
          />{" "}
          <button onClick={this.getUser}>Get</button>
        </h4>

        <h4>Invoice Information</h4>
        <h4>Invoice Id : {this.state.invoiceId}</h4>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Warranty Time</th>
            </tr>
          </thead>
          <tbody>
            {this.state.invoice.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.ItemNumber}</td>
                <td>{invoice.ProductName}</td>
                <td>{invoice.Price}</td>
                <td>{invoice.Quantity}</td>
                <td>{invoice.WarrantyTime}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>User Information</h4>
        <p>
          <b>Username : </b> {this.state.user.Username} <br />
          <b>Name : </b> {this.state.user.Firstname} {this.state.user.Lastname}{" "}
          <br />
          <b>Email : </b> {this.state.user.Email} <br />
          <b>Phone number : </b> {this.state.user.PhoneNumber}
          <br />
        </p>

        <button onClick={this.addInvoice}>Add Invoice</button>
      </div>
    );
  }
}
