import React from 'react';
import styled from 'styled-components';

const SmallerGreyText = styled.div`
  font-size: 75%;
  color: grey;
`;

const CountryClickableText = styled.span`
  text-decoration: underline;
  color: grey;
  cursor: pointer;
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
      currentCountry,
      currentShippingPrice,
      handleSelectCountry,
    } = this.props;

    return (


      <div>
        <h4>Shipping & returns</h4>
        <div>
          <strong>Made just for you. Ready to ship in {shippingMin}–{shippingMax} business days.</strong><br />
          From {currentCountry}<br />
          {currentShippingPrice} shipping to <CountryClickableText onClick={this.handleCountryClick}>{currentCountry}</CountryClickableText><br />
          {this.state.showCountrySelect ?
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
          : null}
          <SmallerGreyText>Shipping upgrades available in the cart</SmallerGreyText><br />
        </div>
        <div>
          <strong>Returns and exchanges accepted</strong><br />
          Exceptions may apply. See return policy.
        </div>
      </div>
    );
  }
}

export default Shipping;
