import React from 'react';
import './VoteBasket.css';

const VoteBasket = ({ votes }) => {
  const renderBalls = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <div key={index} className="ball"></div>
    ));
  };

  return (
    <div className="vote-basket">
      <div className="basket">
        <h3>Boy</h3>
        <div className="balls-container">{renderBalls(votes.boy)}</div>
      </div>
      <div className="basket">
        <h3>Girl</h3>
        <div className="balls-container">{renderBalls(votes.girl)}</div>
      </div>
    </div>
  );
};

export default VoteBasket;
