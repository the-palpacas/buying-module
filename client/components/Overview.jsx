import React from 'react';
import styled from 'styled-components';

const Link = styled.a`
  color: #F56400;

  &:hover {
    color: #F56400;
    text-decoration: underline;
  }
`;

const Overview = ({handmade, madeToOrder, materials, giftMessage, giftCard, feedback, favoritedBy}) => {
  const showGiftCard = () => {
    if (giftCard) {
      return (
        <div>
          <img
            src="https://s3-us-west-1.amazonaws.com/fec-petsy/petsy-gift.png"
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
        <li>Feedback: <Link href="javascript:void(0)">{feedback} reviews</Link></li>
        <li>Favorited by: <Link href="javascript:void(0)">{favoritedBy} people</Link></li>
        {giftMessage ? <li>Gift message available</li> : null}
      </ul>
      {showGiftCard()}
    </div>
  );
};

export default Overview;
