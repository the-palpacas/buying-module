import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SmallerGreyText = styled.div`
  font-size: 75%;
  color: #777777;
  margin-bottom: 5px;
`;

const NoOptionSelected = styled.div`
  background-color: #F76A6A;
`;

const WhiteText = styled.span`
  color: #FFFFFF;
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

    return (
      <div className="product-details">
        <h3>{name}</h3>
        <h4>${this.state.option === 'unselected' ? `${shownPrice}+` : shownPrice}</h4>
        <SmallerGreyText>{taxInfo}</SmallerGreyText>
        <SmallerGreyText>{currentShippingPrice === 'Free' ? 'Free Shipping' : null}</SmallerGreyText>
        <div>{options.name}</div>
        <div>
          <select
            className="form-control"
            name="select-options"
            value={this.state.option}
            onChange={e => this.handleSelectChange(e.target.name, e.target.value)}
          >
            <option value="unselected">
            Select {options.name === null ? 'dimensions' : options.name.toLowerCase()}
            </option>
          {createOptionsDropdown()}
          </select>
        </div>
        <NoOptionSelected>
          <WhiteText>{this.state.buyButtonClickedWithNoOption ? `Please select ${options.name.toLowerCase()}` : null}</WhiteText>
        </NoOptionSelected>
        <div>Quantity</div>
        <div>
          <select
            className="form-control"
            name="select-quantity"
            value={this.state.quantity}
            onChange={e => this.handleSelectChange(e.target.name, e.target.value)}
          >
            {quantityArray.map(number =>
              <option value={number} key={number}>{number}</option>)}
          </select>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-outline-primary"
            name="buy-it-now"
            onClick={e => this.showModal(e.target.name)}
          >
            Buy it now &gt;
          </button>
          <Modal open={this.state.showBuyItNowModal} onClose={this.closeModal} center>
            <h5>Choose your payment method&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</h5>
            <form>
              <input type="radio" value="cc" name="payment" />
              <img
                src="https://s3-us-west-1.amazonaws.com/fec-petsy/petsy-cc.png"
                alt="credit-card"
                className="img-medium"
              />
              <br />
              <input type="radio" value="paypal" name="payment" />
              <img
                src="https://s3-us-west-1.amazonaws.com/fec-petsy/petsy-paypal.png"
                alt="paypal"
                className="img-small"
              />
              <br />
            </form>
            <hr />
            <div>
              <p><strong>Order summary</strong></p>
            </div>
            <Flex>
              <span>Item(s) total</span>
              <span>${shownPrice}</span>
            </Flex>
            <Flex>
              <span>Shipping</span>
              <span>{currentShippingPrice === 'Free' ? 'Free!' : `$${currentShippingPrice}`}</span>
            </Flex>
            <span className="small">(To {currentCountry})</span>
            <hr />
            <Flex>
              <span>
                <strong>Total</strong>
              </span>
              <span>
                <strong>${currentShippingPrice !== 'Free' ? (+shownPrice + +currentShippingPrice).toFixed(2) : shownPrice}</strong>
              </span>
            </Flex>
            <SmallerGreyText>Additional duties and taxes <a href="https://www.etsy.com/help/article/5023">may apply</a>.</SmallerGreyText>
            <div>
              <center>
                <button type="button" className="btn btn-secondary">
                Proceed to checkout
                </button>
              </center>
            </div>
          </Modal>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            name="add-to-cart"
            onClick={e => this.showModal(e.target.name)}
          >
          Add to cart
          </button>
          <Modal open={this.state.showAddToCartModal} onClose={this.closeModal} center>
            <h5>
              <img
                src="https://s3-us-west-1.amazonaws.com/fec-petsy/petsy-cart-modal-placeholder.png"
                alt="cart-placeholder"
                className="img-fluid"
              />
            </h5>
          </Modal>
        </div>
        <div className="want-cart">
          <img
            src="https://s3-us-west-1.amazonaws.com/fec-petsy/petsy-cart.png"
            alt="shopping-cart"
            className="img-small float-left"
          />
          <strong>Other people want this.</strong> {wantNumber} people have this in their carts right now.
        </div>
      </div>
    );
  }
}

export default Details;
