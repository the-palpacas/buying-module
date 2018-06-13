import React from 'react';
import ReactDOM from 'react-dom';
import Details from './components/Details.jsx';
import Overview from './components/Overview.jsx';
import Shipping from './components/Shipping.jsx';
import styled from 'styled-components';

const axios = require('axios');

const Wrapper = styled.div`
  font-family: "Graphik Webfont",-apple-system,BlinkMacSystemFont,"Roboto","Droid Sans","Segoe UI","Helvetica",Arial,sans-serif;
  font-size: 14px;
  line-height: 1.4;
  width: 392px;
`;

class BuyingModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritedBy: null,
      feedback: null,
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
      shippingMin: null,
      shippingMax: null,
      shopLocation: null,
      currentCountry: null,
      currentShipping: null,
      wantNumber: Math.floor(Math.random() * 18 + 2),
    };
    this.handleSelectCountry = this.handleSelectCountry.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:8000${window.location.pathname}details`)
      .then((response) => {
        this.setState({
          favoritedBy: response.data[0].favoritedBy,
          feedback: response.data[0].feedback,
          freeShipping: response.data[0].freeShipping,
          giftCard: response.data[0].giftCard,
          giftMessage: response.data[0].giftMessage,
          handmade: response.data[0].handmade,
          id: response.data[0].id,
          madeToOrder: response.data[0].madeToOrder,
          materials: response.data[0].materials,
          name: response.data[0].name,
          options: {
            name: response.data[0].options.name,
            differentOptions: response.data[0].options.differentOptions,
            price: response.data[0].options.price,
          },
          quantity: response.data[0].quantity,
          shippingCountries: response.data[0].shippingCountries,
          shippingPrice: response.data[0].shippingPrice,
          shippingMin: response.data[0].shippingMin,
          shippingMax: response.data[0].shippingMax,
          shopLocation: response.data[0].shopLocation,
          currentCountry: response.data[0].shippingCountries[0],
          currentShippingPrice: response.data[0].shippingPrice[0],
        });
      })
      .catch(error => console.error('Error in getting product data: ', error));
  }

  handleSelectCountry(country) {
    let result;
    for (let i = 0; i < this.state.shippingCountries.length; i += 1) {
      if (this.state.shippingCountries[i] === country) {
        result = i;
      }
    }
    const displayedShippingPrice = this.state.shippingPrice[result] === 0 ? 'Free' : this.state.shippingPrice[result].toFixed(2);

    this.setState({
      currentCountry: country,
      currentShippingPrice: displayedShippingPrice,
    });
  }

  render() {
    return (
      <Wrapper>
        <Details
          name={this.state.name}
          options={this.state.options}
          quantity={this.state.quantity}
          wantNumber={this.state.wantNumber}
          currentCountry={this.state.currentCountry}
          currentShippingPrice={this.state.currentShippingPrice}
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
        <hr />
        <Shipping
          shippingCountries={this.state.shippingCountries}
          shippingPrice={this.state.shippingPrice}
          shippingMin={this.state.shippingMin}
          shippingMax={this.state.shippingMax}
          shopLocation={this.state.shopLocation}
          currentCountry={this.state.currentCountry}
          currentShippingPrice={this.state.currentShippingPrice}
          handleSelectCountry={this.handleSelectCountry}
        />
      </Wrapper>
    );
  }
}

ReactDOM.render(<BuyingModule />, document.getElementById('buying-module'));
