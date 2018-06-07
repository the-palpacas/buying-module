import React from 'react';

const Shipping = ({shippingCountries, shippingPrice, shippingMin, shippingMax}) => {
  const smallerText = {
    fontSize: 14,
  };

  return (
    <div>
      <h4>Shipping & returns</h4>
      <p>
        Made just for you. Ready to ship in {shippingMin}–{shippingMax} business days.<br />
        From United States<br />
        $14.00 shipping to United States, 94109<br />
        <span style={smallerText}>Shipping upgrades available in the cart</span>
      </p>
      <p>
        <strong>Returns and exchanges accepted</strong><br />
        Exceptions may apply. See return policy.
      </p>
    </div>
  );
};

export default Shipping;
