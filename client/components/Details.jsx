import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SmallerText = styled.div`
  font-size: 75%;
`;

const SmallerGreyText = styled.div`
  font-size: 75%;
  color: grey;
`;

const NoOptionSelected = styled.div`
  background-color: red;
`;

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
      let holder = [];
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

    return (
      <div>
        <h1>{name}</h1>
        <h2>${this.state.option === 'unselected' ? `${shownPrice}+` : shownPrice}</h2>
        <SmallerGreyText>{taxInfo}</SmallerGreyText>
        <SmallerGreyText>{currentShippingPrice === 'Free' ? 'Free Shipping' : null}</SmallerGreyText>
        <div>{options.name}</div>
        <select
          className="form-control"
          name="select-options"
          value={this.state.option}
          onChange={e => this.handleSelectChange(e.target.name, e.target.value)}
        >
          <option
            value="unselected"
          >
          Select {options.name === null ? 'dimensions' : options.name.toLowerCase()}
          </option>
          {createOptionsDropdown()}
        </select>
        <NoOptionSelected>{this.state.buyButtonClickedWithNoOption ? `Please select ${options.name.toLowerCase()}` : null}</NoOptionSelected>
        <div>Quantity</div>
        <select
          className="form-control"
          name="select-quantity"
          value={this.state.quantity}
          onChange={e => this.handleSelectChange(e.target.name, e.target.value)}
        >
          {quantityArray.map(number =>
            <option value={number} key={number}>{number}</option>)}
        </select>
        <div>
          <button
            type="button"
            className="btn btn-outline-secondary"
            name="buy-it-now"
            onClick={e => this.showModal(e.target.name)}
          >
            Buy it now
          </button>
          <Modal open={this.state.showBuyItNowModal} onClose={this.closeModal} center>
            <h5>Choose your payment method&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</h5>
            <form>
              <input type="radio" value="cc" name="payment" /> Credit card<br />
              <input type="radio" value="paypal" name="payment" /> PayPal<br />
            </form>
            <hr />
            <div><p><strong>Order summary</strong></p></div>
            <Flex><span>Item(s) total</span><span>${shownPrice}</span></Flex>
            <Flex><span>Shipping</span><span>SHIPPING PRICE HERE</span></Flex>
            <SmallerText>(To COUNTRY HERE)</SmallerText>
            <hr />
            <Flex><span><strong>Total</strong></span><span><strong>${shownPrice}</strong></span></Flex>
            <SmallerGreyText>Additional duties and taxes <a href="https://www.etsy.com/help/article/5023">may apply</a></SmallerGreyText>
            <div><center><button type="button" className="btn btn-secondary">Proceed to checkout</button></center></div>
          </Modal>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-outline-secondary"
            name="add-to-cart"
            onClick={e => this.showModal(e.target.name)}
          >
          Add to cart
          </button>
          <Modal open={this.state.showAddToCartModal} onClose={this.closeModal} center>
            <h5>CART OVERVIEW HERE &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</h5>
          </Modal>
        </div>
        <div>
          Other people want this. {wantNumber} people have this in their carts right now.
        </div>
      </div>
    );
  }
}

export default Details;
