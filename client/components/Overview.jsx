import React from 'react';

const Overview = ({handmade, madeToOrder, materials, giftMessage, giftCard}) => {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max + 2);
  };

  return (
    <div>
      <h4>Overview</h4>
      <ul>
        {handmade ? <li>Handmade item</li> : null}
        {madeToOrder ? <li>Made to order</li> : null}
        {materials ? <li>Materials: {materials}</li> : null}
        <li>Feedback: {getRandomInt(1000)} reviews</li>
        <li>Favorited by: {getRandomInt(1000)} people</li>
        {giftMessage ? <li>Gift message available</li> : null}
      </ul>
      <div>
        {giftCard ? 'This shop accepts Etsy gift cards' : null}
      </div>
    </div>
  );
};

export default Overview;
