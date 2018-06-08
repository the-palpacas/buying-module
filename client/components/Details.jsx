import React from 'react';

class Details extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      option: 'unselected',
      quantity: 1,
    };
    this.handleOptionsChange = this.handleOptionsChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max + 2);
  }

  handleOptionsChange(event) {
    this.setState({
      option: event.target.value,
    });
  }

  handleQuantityChange(event) {
    this.setState({
      quantity: event.target.value,
    });
  }

  render() {
    const {
      name,
      options,
      quantity,
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

    return (
      <div>
        <h1>{name}</h1>
        <h2>${this.state.option === 'unselected' ? `${shownPrice}+` : shownPrice}</h2>
        <div>{options.name}</div>
        <select className="form-control" value={this.state.option} onChange={this.handleOptionsChange}>
          <option value="unselected">Select {options.name === null ? 'dimensions' : options.name.toLowerCase()}</option>
          {createOptionsDropdown()}
        </select>
        <div>Quantity</div>
        <select className="form-control" value={this.state.quantity} onChange={this.handleQuantityChange}>
          {quantityArray.map(number =>
            <option value={number} key={number}>{number}</option>)}
        </select>
        <div>
          <button type="button" className="btn btn-outline-secondary">Buy it now</button>
        </div>
        <div>
          <button type="button" className="btn btn-outline-secondary">Add to cart</button>
        </div>
        <div>
          Other people want this. {this.getRandomInt(20)} people have this in their carts right now.
        </div>
      </div>
    );
  }
}

export default Details;
