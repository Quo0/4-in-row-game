import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { SERVER_API, TIMEOUTS } from '../constants';

export default function Queue() {
  const [loading, setLoading] = useState(true);
  const [queueState, setQueueState] = useState({
    canStartConfirmation: false,
    players: {
      all: [],
      pending: [],
      confirmed: []
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      Axios.get(SERVER_API.queue.getState).then(res => {
        const { players, confirmed } = res.data;
        !players.all.length && (window.location.hash = '#/');

        if (confirmed) {
          window.location.hash = '#/game';
        } else {
          setQueueState(res.data);
          setLoading(false);
        }
      })
    }, TIMEOUTS.serverUpdate);

    return () => clearInterval(interval);
  }, []);
  
  const { players, canStartConfirmation } = queueState; 
  const currentUser = JSON.parse(localStorage.getItem('userData'));  
  if (!currentUser) { return <Redirect to='/' /> };
  const isCurrentUserInQueue = players.pending.some(user => user.id === currentUser.id);
  const doesCurrentUserConfirmedQueue = players.confirmed.some(user => user.id === currentUser.id);

  const handleApiError = (err) => console.error(err);
  const joinQueue = () => Axios.post(SERVER_API.queue.join(currentUser.id)).catch(handleApiError);
  const leaveQueue = () => Axios.post(SERVER_API.queue.leave(currentUser.id)).catch(handleApiError);
  const confirmQueue = () => Axios.post(SERVER_API.queue.confirm(currentUser.id)).catch(handleApiError);
  const declineQueue = () =>  Axios.post(SERVER_API.queue.decline).catch(handleApiError);

  return (
    <div className="queue">
      {loading ? <p>loading...</p> : (
        <>
        <p>Your username: {currentUser && currentUser.name}</p>
        <div className="queue__state">
          <div>
            <h3>All players:</h3>
            <ul>
              {players.all.map(user => {
                return <li key={user.id}>{user.name}</li>
              })}
            </ul>
          </div>
          <div>
            <h3>In queue:</h3>
            <ul>
              {players.pending.map(user => {
                return <li key={user.id}>{user.name}</li>
              })}
            </ul>
          </div>
          <div>
            <h3>Will play:</h3>
            <ul>
              {players.confirmed.map(user => {
                return <li key={user.id}>{user.name}</li>
              })}
            </ul>
          </div>
        </div>

        <div className="queue__actions">
          {!isCurrentUserInQueue && <button onClick={joinQueue}>Join queue</button>}
        </div>

        <div className="queue__dialog">
          {(isCurrentUserInQueue && !canStartConfirmation) && (
            <>
            <p>Waiting for other players to join...</p>
            <button onClick={leaveQueue}>Leave queue</button>
            </>
          )}
          {(canStartConfirmation && !doesCurrentUserConfirmedQueue) && (
            <>
            <p>Confirm or decline asap!</p>
            <button onClick={confirmQueue}>Confirm</button>
            <button onClick={declineQueue}>Decline</button>
            </>
          )}
          {doesCurrentUserConfirmedQueue && <p>Participation confirmed, waiting for other players...</p>}
        </div>
        </>
      )}
    </div>
  );
};

