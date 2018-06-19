import React from 'react';
import Modal from 'react-responsive-modal';

// hi mac! please review this component and others in my client folder if there is time. thank you <3 

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 'unselected',
      quantity: 1,
      showBuyItNowModal: false,
      showAddToCartModal: false,
      buyButtonClickedWithNoOption: false,
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  showModal(name) {
    if (this.state.option !== 'unselected') {
      if (name === 'buy-it-now') {
        this.setState({
          showBuyItNowModal: true,
        });
      } else {
        this.setState({
          showAddToCartModal: true,
        });
      }
    } else {
      this.setState({
        buyButtonClickedWithNoOption: true,
      });
    }
  }

  closeModal() {
    this.setState({
      showBuyItNowModal: false,
      showAddToCartModal: false,
    });
  }

  handleSelectChange(name, value) {
    if (name === 'select-options') {
      this.setState({
        option: value,
        buyButtonClickedWithNoOption: false,
      });
    } else {
      this.setState({
        quantity: value,
      });
    }
  }

  render() {
    const {
      name,
      options,
      quantity,
      wantNumber,
      currentCountry,
      currentShippingPrice,
    } = this.props;

    const quantityArray = [];
    for (let i = 1; i < quantity; i += 1) {
      quantityArray.push(i);
    }

    const createOptionsDropdown = () => {
      const holder = [];
      let i = 0;
      while (i < options.price.length) {
        options.differentOptions.map(option => {
          holder.push(<option value={option} key={option}>{option} (${options.price[i]})</option>);
          i += 1;
        });
      }
      return holder;
    };

    let shownPrice = (options.price[0] * this.state.quantity).toFixed(2);
    for (let i = 0; i < options.differentOptions.length; i += 1) {
      if (this.state.option === options.differentOptions[i]) {
        shownPrice = (options.price[i] * this.state.quantity).toFixed(2);
      }
    }

    let taxInfo;
    const noTaxDisplay = ['United States', 'Canada'];
    const vatDisplay = ['European Union', 'Belarus', 'Iceland', 'India', 'New Zealand', 'Norway', 'Russia', 'Serbia', 'South Africa', 'South Korea', 'Taiwan', 'Turkey', 'Switzerland', 'United Arab Emirates'];
    const gstDisplay = ['Australia', 'New Zealand'];
    if (noTaxDisplay.includes(currentCountry)) {
      taxInfo = null;
    } else if (vatDisplay.includes(currentCountry)) {
      taxInfo = 'VAT included (where applicable)';
    } else if (gstDisplay.includes(currentCountry)) {
      taxInfo = 'GST included (where applicable)';
    } else {
      taxInfo = 'Local taxes included (where applicable)';
    }

    const showPleaseSelectOption = () => {
      if (this.state.buyButtonClickedWithNoOption) {
        return (
          <div className="no-option-selected">
            Please select {options.name.toLowerCase()}
          </div>
        );
      }
      return null;
    };

    return (
      <div>
        <h1>{name}</h1>
        <h2>${this.state.option === 'unselected' ? `${shownPrice}+` : shownPrice}</h2>
        <div className="smaller-text smaller-text-grey">{taxInfo}</div>
        <div className="smaller-text smaller-text-grey">{currentShippingPrice === 'Free' ? 'Free Shipping' : null}</div>
        <div>{options.name}</div>
        <div>
          <select
            className="select"
            name="select-options"
            onChange={e => this.handleSelectChange(e.target.name, e.target.value)}
            value={this.state.option}
          >
            <option value="unselected">
            Select {options.name === null ? 'dimensions' : options.name.toLowerCase()}
            </option>
            {createOptionsDropdown()}
          </select>
        </div>
        {showPleaseSelectOption()}
        <div>Quantity</div>
        <div>
          <select
            className="select"
            name="select-quantity"
            onChange={e => this.handleSelectChange(e.target.name, e.target.value)}
            value={this.state.quantity}
          >
            {quantityArray.map(number =>
              <option value={number} key={number}>{number}</option>)}
          </select>
        </div>
        <div>
          <button
            className="button-primary-orange button-outline"
            name="buy-it-now"
            onClick={e => this.showModal(e.target.name)}
          >
            Buy it now &gt;
          </button>
          <Modal open={this.state.showBuyItNowModal} onClose={this.closeModal} center>
            <div id="modal">
              <h3>Choose your payment method</h3>
              <form>
                <input type="radio" value="cc" name="payment" />
                <img
                  alt="credit-card"
                  className="cc"
                  src="https://s3-us-west-1.amazonaws.com/fec-petsy/petsy-cc-resized.png"
                />
                <br />
                <input type="radio" value="paypal" name="payment" />
                <img
                  alt="paypal"
                  className="pp"
                  src="https://s3-us-west-1.amazonaws.com/fec-petsy/petsy-paypal-resized.png"
                />
                <br />
              </form>
              <hr />
              <div>
                <p><strong>Order summary</strong></p>
              </div>
              <div className="flex-checkout">
                <span>Item(s) total</span>
                <span>${shownPrice}</span>
              </div>
              <div className="flex-checkout">
                <span>Shipping</span>
                <span>{currentShippingPrice === 'Free' ? 'Free!' : `$${currentShippingPrice}`}</span>
              </div>
              <div className="smaller-text">(To {currentCountry})</div>
              <hr />
              <div className="flex-checkout">
                <span>
                  <strong>Total</strong>
                </span>
                <span>
                  <strong>${currentShippingPrice !== 'Free' ? (+shownPrice + +currentShippingPrice).toFixed(2) : shownPrice}</strong>
                </span>
              </div>
              <div className="smaller-text smaller-text-grey">
                {taxInfo} <br />
                Additional duties and taxes <a className="details-link" href="https://www.etsy.com/help/article/5023">may apply</a>.
              </div>
              <div>
                <center>
                  <button className="button-primary-orange">
                  Proceed to checkout
                  </button>
                </center>
              </div>
            </div>
          </Modal>
        </div>
        <div>
          <button
            className="button-primary-orange"
            name="add-to-cart"
            onClick={e => this.showModal(e.target.name)}
          >
          Add to cart
          </button>
          <Modal open={this.state.showAddToCartModal} onClose={this.closeModal} center>
            <img
              alt="checkout-placeholder"
              src="https://s3-us-west-1.amazonaws.com/fec-petsy/petsy-cart-placeholder.png"
            />
          </Modal>
        </div>
        <div className="cart-format">
          <img
            alt="shopping-cart"
            className="cart"
            src="https://s3-us-west-1.amazonaws.com/fec-petsy/petsy-cart-resized.png"
          />
        </div>
        <div className="want-text">
          <strong>Other people want this.</strong> {wantNumber} people have this in their carts right now.
        </div>
      </div>
    );
  }
}

export default Details;
