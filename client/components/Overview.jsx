import React from 'react';

const Overview = ({handmade, madeToOrder, materials, giftMessage, giftCard, feedback, favoritedBy}) => {
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max + 2);
  };

  const showGiftCard = () => {
    if (giftCard) {
      return (
        <div>
          <img
            src="https://s3-us-west-1.amazonaws.com/fec-petsy/petsy-gift"
            alt="petsy-gift"
            className="img-gift float-left"
          />
          This shop accepts Etsy gift cards
        </div>);
    }
    return null;
  };

  return (
    <div>
      <h5>Overview</h5>
      <ul>
        {handmade ? <li>Handmade item</li> : null}
        {madeToOrder ? <li>Made to order</li> : null}
        {materials ? <li>Materials: {materials}</li> : null}
        <li>Feedback: {feedback} reviews</li>
        <li>Favorited by: {favoritedBy} people</li>
        {giftMessage ? <li>Gift message available</li> : null}
      </ul>
      {showGiftCard()}
    </div>
  );
};

export default Overview;