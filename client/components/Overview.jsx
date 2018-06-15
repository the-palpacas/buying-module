import React from 'react';

const Overview = ({handmade, madeToOrder, materials, giftMessage, giftCard, feedback, favoritedBy}) => {
  const showGiftCard = () => {
    if (giftCard) {
      return (
        <div>
          <img
            alt="gift-icon"
            className="gift-icon"
            src="https://s3-us-west-1.amazonaws.com/fec-petsy/petsy-gift.png"
          />
          This shop accepts Etsy gift cards
        </div>);
    }
    return null;
  };

  return (
    <div>
      <h3>Overview</h3>
      <ul>
        {handmade ? <li>Handmade item</li> : null}
        {madeToOrder ? <li>Made to order</li> : null}
        {materials ? <li>Materials: {materials}</li> : null}
        <li>Feedback: <a className="overview-link" href="javascript:void(0)">{feedback} reviews</a></li>
        <li>Favorited by: <a className="overview-link" href="javascript:void(0)">{favoritedBy} people</a></li>
        {giftMessage ? <li>Gift message available</li> : null}
      </ul>
      {showGiftCard()}
    </div>
  );
};

export default Overview;
