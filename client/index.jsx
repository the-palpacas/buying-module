import React from 'react';
import ReactDOM from 'react-dom';

const axios = require('axios');

class BuyingModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.getProductData();
  }

  getProductData() {
    const url = window.location.pathname;
    axios.get(`${url}details`)
      .then(response => console.log('Product Data: ', response.data))
      .catch(error => console.error('Error in getting product data: ', error));
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
      </div>
    );
  }
}

ReactDOM.render(<BuyingModule />, document.getElementById('buying-module'));
