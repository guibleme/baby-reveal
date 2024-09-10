import React, { useState } from 'react';
import VoteBasket from './VoteBasket';
import { Button, Icon, Label, Input } from 'semantic-ui-react'

const Voting = () => {
  const [votes, setVotes] = useState({ boy: 0, girl: 0 });
  const [name, setName] = useState('');

  const handleVote = (option) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [option]: prevVotes[option] + 1,
    }));
  };

  return (
    <div>
      <h2>Vote for boy or girl</h2>
      <div style={{marginBottom: '10px'}}>
        <Input
        size='large'
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>


      <Button as='div' 
        size='large' labelPosition='right' onClick={() => handleVote('boy')}>
        <Button color='blue'>
          <Icon name='heart' />
          Boy
        </Button>
        <Label as='a' basic color='blue' pointing='left'>
        {votes.boy}
        </Label>
      </Button>

      <Button as='div' 
        size='large' labelPosition='right' onClick={() => handleVote('girl')}>
        <Button color='pink'>
          <Icon name='heart' />
          Girl
        </Button>
        <Label as='a' basic color='pink' pointing='left'>
        {votes.girl}
        </Label>
      </Button>
      {/* <div>
        <p>Boy: {votes.boy}</p>
        <p>Girl: {votes.girl}</p>
      </div> */}
      {/* <VoteBasket votes={votes} /> */}
    </div>
  );
};

export default Voting;
