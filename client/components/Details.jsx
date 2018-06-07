import React from 'react';

const Details = ({name, options, quantity}) => {
  const quantityArray = [];
  for (let i = 1; i < quantity; i += 1) {
    quantityArray.push(i);
  }

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max + 2);
  };

  return (
    <div>
      <h1>{name}</h1>
      <h2>${options.price[0]}+</h2>
      <div>{options.name}</div>
      <select className="form-control">
        <option>Select {options.name === null ? 'categories' : options.name.toLowerCase()}</option>
        {options.differentOptions.map(option =>
        <option value={option} key={option}>{option}</option>)}
      </select>
      <div>Quantity</div>
      <select className="form-control">{quantityArray.map(number =>
        <option value={number} key={number}>{number}</option>)}
      </select>
      <div>
        <button type="button" className="btn btn-outline-secondary">Buy it now</button>
      </div>
      <div>
        <button type="button" className="btn btn-outline-secondary">Add to cart</button>
      </div>
      <div>
        Other people want this. {getRandomInt(20)} people have this in their carts right now.
      </div>
    </div>
  );
};

export default Details;
