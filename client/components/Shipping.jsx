import React from 'react';

class Shipping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCountrySelect: false,
    };
    this.handleCountryClick = this.handleCountryClick.bind(this);
  }

  handleCountryClick() {
    this.setState({
      showCountrySelect: !this.state.showCountrySelect,
    });
  }

  render() {
    const {
      shippingCountries,
      shippingPrice,
      shippingMin,
      shippingMax,
      shopLocation,
      currentCountry,
      currentShippingPrice,
      handleSelectCountry,
    } = this.props;

    const renderShipping = () => {
      if (currentShippingPrice === 'Free') {
        return currentShippingPrice;
      }
      return `$${currentShippingPrice}`;
    };

    const showCountryDropdown = () => {
      if (this.state.showCountrySelect) {
        return (
          <select
            className="select"
            name="select-country"
            onChange={e => handleSelectCountry(e.target.value)}
          >
            <option>Choose Country</option>
            <option disabled>----------</option>
            {shippingCountries.map(country =>
              <option value={country} key={country}>{country}</option>)}
          </select>
        );
      }
      return null;
    };

    return (
      <div className="shipping-div">
        <h3>Shipping &amp; returns</h3>
        <div className="shipping-div">
          <strong>Made just for you. Ready to ship in {shippingMin}–{shippingMax} business days.</strong>
        </div>
        <div className="shipping-div">
          From {shopLocation}
        </div>
        <div className="shipping-div">
          {renderShipping()} shipping to <a href="javascript:void(0)" onClick={this.handleCountryClick} className="shipping-link"><u>{currentCountry}</u></a><br />
          {showCountryDropdown()}
        </div>
        <div className="shipping-div">
          <div className="shipping-text">Shipping upgrades available in the cart</div>
        </div>
        <div className="shipping-div">
          <strong>Returns and exchanges accepted</strong>
        </div>
        <div className="shipping-div">
          Exceptions may apply. <a href="javascript:void(0)" className="shipping-link"><u>See return policy</u></a>.
        </div>
      </div>
    );
  }
}

export default Shipping;
