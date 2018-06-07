import React from 'react';
import ReactDOM from 'react-dom';
import Details from './components/Details.jsx';
import Overview from './components/Overview.jsx';

const axios = require('axios');

class BuyingModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      freeShipping: null,
      giftCard: null,
      giftMessage: null,
      handmade: null,
      id: null,
      madeToOrder: null,
      materials: null,
      name: null,
      options: {
        name: null,
        differentOptions: [],
        price: [],
      },
      quantity: null,
      shippingCountries: [],
      shippingPrice: [],
      feedback: null,
      favoritedBy: null,
      shippingMin: null,
      shippingMax: null,
    };
  }

  componentDidMount() {
    axios.get(`${window.location.pathname}details`)
      .then((response) => {
        console.log('Product Data: ', response.data);
        this.setState({
          freeShipping: response.data[0].freeShipping,
          giftCard: response.data[0].giftCard,
          giftMessage: response.data[0].giftMessage,
          handmade: response.data[0].handmade,
          id: response.data[0].id,
          madeToOrder: response.data[0].madeToOrder,
          materials: response.data[0].materials,
          name: response.data[0].name,
          options: response.data[0].options,
          quantity: response.data[0].quantity,
          shippingCountries: response.data[0].shippingCountries,
          shippingPrice: response.data[0].shippingPrice,
          feedback: response.data[0].feedback,
          favoritedBy: response.data[0].favoritedBy,
          shippingMin: response.data[0].shippingMin,
          shippingMax: response.data[0].shippingMax,
        });
      })
      .catch(error => console.error('Error in getting product data: ', error));
  }

  render() {
    return (
      <div className="container">
        <Details
          name={this.state.name}
          options={this.state.options}
          quantity={this.state.quantity}
        />
        <hr />
        <Overview
          handmade={this.state.handmade}
          madeToOrder={this.state.madeToOrder}
          materials={this.state.materials}
          giftMessage={this.state.giftMessage}
          giftCard={this.state.giftCard}
          feedback={this.state.feedback}
          favoritedBy={this.state.favoritedBy}
          shippingMin={this.state.shippingMin}
          shippingMax={this.state.shippingMax}
        />
      </div>
    );
  }
}

ReactDOM.render(<BuyingModule />, document.getElementById('buying-module'));
