import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  margin-bottom: 5px;
`;

const Link = styled.a`
  color: #444;

  &:hover {
    color: #666;
    text-decoration: underline;
  }
`;

const SmallerGreyText = styled.div`
  font-size: 80%;
  color: #777;
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
      <Div>
        <h3>Shipping &amp; returns</h3>
        <Div>
          <strong>Made just for you. Ready to ship in {shippingMin}–{shippingMax} business days.</strong>
        </Div>
        <Div>
          From {shopLocation}
        </Div>
        <Div>
          {renderShipping()} shipping to <Link href="javascript:void(0)" onClick={this.handleCountryClick}><u>{currentCountry}</u></Link><br />
          {showCountryDropdown()}
        </Div>
        <Div>
          <SmallerGreyText>Shipping upgrades available in the cart</SmallerGreyText>
        </Div>
        <Div>
          <strong>Returns and exchanges accepted</strong>
        </Div>
        <Div>
          Exceptions may apply. <Link href="javascript:void(0)"><u>See return policy</u></Link>.
        </Div>
      </Div>
    );
  }
}

export default Shipping;
