import React from 'react';
import styled from 'styled-components';

const Link = styled.a`
  color: #F56400;

  &:hover {
    color: #F56400;
    text-decoration: underline;
  }
`;

const Img = styled.img`
  max-width: 6%;
  max-height: 6%;
  vertical-align: middle;
  float: left;
  padding: 0 5px;
`;

const ListItem = styled.li`
  margin-bottom: 3px;
`;

const Overview = ({handmade, madeToOrder, materials, giftMessage, giftCard, feedback, favoritedBy}) => {
  const showGiftCard = () => {
    if (giftCard) {
      return (
        <div>
          <Img
            src="https://s3-us-west-1.amazonaws.com/fec-petsy/petsy-gift.png"
            alt="petsy-gift"
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
        {handmade ? <ListItem>Handmade item</ListItem> : null}
        {madeToOrder ? <ListItem>Made to order</ListItem> : null}
        {materials ? <ListItem>Materials: {materials}</ListItem> : null}
        <ListItem>Feedback: <Link href="javascript:void(0)">{feedback} reviews</Link></ListItem>
        <ListItem>Favorited by: <Link href="javascript:void(0)">{favoritedBy} people</Link></ListItem>
        {giftMessage ? <ListItem>Gift message available</ListItem> : null}
      </ul>
      {showGiftCard()}
    </div>
  );
};

export default Overview;
