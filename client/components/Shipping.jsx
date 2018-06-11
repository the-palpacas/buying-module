import React from 'react';
import styled from 'styled-components';

const SmallerGreyText = styled.div`
  font-size: 75%;
  color: #777777;
  margin-bottom: 20px;
`;

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
            className="form-control"
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
      <div>
        <h5>Shipping &amp; returns</h5>
        <div>
          <strong>Made just for you. Ready to ship in {shippingMin}–{shippingMax} business days.</strong>
        </div>
        <div>
          From {shopLocation}
        </div>
        <div>
          {renderShipping()} shipping to <a href="javascript:void(0)" onClick={this.handleCountryClick}><u>{currentCountry}</u></a><br />
          {showCountryDropdown()}
        </div>
        <div>
          <SmallerGreyText>Shipping upgrades available in the cart</SmallerGreyText>
        </div>
        <div>
          <strong>Returns and exchanges accepted</strong>
        </div>
        <div>
          Exceptions may apply. <a href="javascript:void(0)"><u>See return policy</u></a>.
        </div>
      </div>
    );
  }
}

export default Shipping;
