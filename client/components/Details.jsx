import React from 'react';
import styled from 'styled-components';
import Modal from 'react-responsive-modal';

const Button = styled.button`
  background-color: ${props => props.primary ? '#F56400' : 'transparent'};
  border: 2px solid transparent;
  border-color: #F56400;
  border-radius: 0.25rem;
  color: ${props => props.primary ? '#fff' : '#F56400'};
  display: inline-block;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 0.375rem 0.75rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  vertical-align: middle;
  width: 100%;

  &:hover {
    color: #fff;
    background-color: ${props => props.primary ? '#FC6E0C' : '#F56400'};
    border-color: ${props => props.primary ? '#FC6E0C' : '#F56400'};
  }
`;

const CartDiv = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header3 = styled.h3`
  margin-bottom: 5px;
`;

const ImgCart = styled.img`
  max-width: 60px;
  max-height: 60px;
  vertical-align: middle;
  float: left;
  padding: 0 15px;
`;

const Img = styled.img`
  width: ${props => props.CC ? '40%' : '12%'};
  height: ${props => props.CC ? '40%' : '12%'};
  vertical-align: middle;
`;

const ImgLarge = styled.img`
  max-width: 800px;
  height: auto;
  vertical-align: middle;
`;

const Link = styled.a`
  color: #777;
`;

const NoOptionSelected = styled.div`
  background-color: #F76A6A;
  border-radius: 3px;
  color: #FFF;
  margin-top: -5px;
  padding: 6px;
`;

const Select = styled.select`
  margin-bottom: 10px;
  height: calc(1.2rem + 2px);
`;

const SmallerText = styled.div`
  font-size: 80%;
`;

const SmallerTextGrey = SmallerText.extend`
  color: #777;
  margin-bottom: 10px;
`;

const WantText = styled.div`
  margin-top: 15px; 
  margin-bottom: 30px; 
`;

const Wrapper = styled.div`
  font-family: "Graphik Webfont",-apple-system,BlinkMacSystemFont,"Roboto","Droid Sans","Segoe UI","Helvetica",Arial,sans-serif;
  font-size: 14px;
  line-height: 1.4;
  width: 474px;
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

    const showPleaseSelectOption = () => {
      if (this.state.buyButtonClickedWithNoOption) {
        return (
          <NoOptionSelected>
            Please select {options.name.toLowerCase()}
          </NoOptionSelected>
        );
      }
      return null;
    };

    return (
      <div>
        <h2>{name}</h2>
        <Header3>${this.state.option === 'unselected' ? `${shownPrice}+` : shownPrice}</Header3>
        <SmallerTextGrey>{taxInfo}</SmallerTextGrey>
        <SmallerTextGrey>{currentShippingPrice === 'Free' ? 'Free Shipping' : null}</SmallerTextGrey>
        <div>{options.name}</div>
        <div>
          <Select
            name="select-options"
            value={this.state.option}
            onChange={e => this.handleSelectChange(e.target.name, e.target.value)}
          >
            <option value="unselected">
            Select {options.name === null ? 'dimensions' : options.name.toLowerCase()}
            </option>
            {createOptionsDropdown()}
          </Select>
        </div>
        {showPleaseSelectOption()}
        <div>Quantity</div>
        <div>
          <Select
            name="select-quantity"
            value={this.state.quantity}
            onChange={e => this.handleSelectChange(e.target.name, e.target.value)}
          >
            {quantityArray.map(number =>
              <option value={number} key={number}>{number}</option>)}
          </Select>
        </div>
        <div>
          <Button
            name="buy-it-now"
            onClick={e => this.showModal(e.target.name)}
          >
            Buy it now &gt;
          </Button>
          <Modal open={this.state.showBuyItNowModal} onClose={this.closeModal} center>
            <Wrapper>
              <Header3>Choose your payment method</Header3>
              <form>
                <input type="radio" value="cc" name="payment" />
                <Img
                  CC
                  src="https://s3-us-west-1.amazonaws.com/fec-petsy/petsy-cc.png"
                  alt="credit-card"
                />
                <br />
                <input type="radio" value="paypal" name="payment" />
                <Img
                  src="https://s3-us-west-1.amazonaws.com/fec-petsy/petsy-paypal.png"
                  alt="paypal"
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
              <SmallerText>(To {currentCountry})</SmallerText>
              <hr />
              <Flex>
                <span>
                  <strong>Total</strong>
                </span>
                <span>
                  <strong>${currentShippingPrice !== 'Free' ? (+shownPrice + +currentShippingPrice).toFixed(2) : shownPrice}</strong>
                </span>
              </Flex>
              <SmallerTextGrey>
                {taxInfo} <br />
                Additional duties and taxes <Link href="https://www.etsy.com/help/article/5023">may apply</Link>.
              </SmallerTextGrey>
              <div>
                <center>
                  <Button primary>
                  Proceed to checkout
                  </Button>
                </center>
              </div>
            </Wrapper>
          </Modal>
        </div>
        <div>
          <Button
            primary
            name="add-to-cart"
            onClick={e => this.showModal(e.target.name)}
          >
          Add to cart
          </Button>
          <Modal open={this.state.showAddToCartModal} onClose={this.closeModal} center>
            <ImgLarge
              src="https://s3-us-west-1.amazonaws.com/fec-petsy/petsy-cart-modal-placeholder.png"
              alt="cart-placeholder"
            />
          </Modal>
        </div>
        <CartDiv>
          <ImgCart
            src="https://s3-us-west-1.amazonaws.com/fec-petsy/petsy-cart.png"
            alt="shopping-cart"
          />
        </CartDiv>
        <WantText>
          <strong>Other people want this.</strong> {wantNumber} people have this in their carts right now.
        </WantText>
      </div>
    );
  }
}

export default Details;
