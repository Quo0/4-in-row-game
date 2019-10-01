import React from 'react';
import { Link } from 'react-router-dom';

export default function End() {
  return (
    <div>
      <h1>End Page</h1>
      <Link to={{
        pathname: '/game',
        state: {
          player1Name: 'Budda',
          player2Name: 'Jesus'
        }
      }}>Start</Link>
    </div>
  );
};