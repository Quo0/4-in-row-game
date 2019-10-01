import React, { useState } from 'react';
import { SERVER_API, TIMEOUTS } from '../constants';
import Axios from 'axios';

export default function Welcome() {
  const [registered, setRegistered] = useState(false);
  const [userName, setUserName] = useState('');

  const register = () => Axios.post(SERVER_API.queue.register, { userName }).then(res => {
    setRegistered(true);
    localStorage.setItem('userData', JSON.stringify(res.data));
    setTimeout(() => { window.location.hash = '#/queue' }, TIMEOUTS.redirect);
  }).catch(err => console.error(err));

  return (
    <div>
      <h1>Connect four</h1>
      {registered ? (
        <div>
          <p>Congradulations, {userName}!</p>
          <p>You have successfully registered</p>
        </div>
      ) : (
        <div>
          <p>Welcome to the game! What is your name?</p>
          <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
          <button disabled={!userName.length} onClick={register}>Join the game!</button>        
        </div>
      )}
    </div>
  );
};

{/* <Link to={{
  pathname: '/game',
  state: {
    player1Name: 'Budda',
    player2Name: 'Jesus'
  }
}}>Start</Link> */}