import React , { useState, useEffect } from 'react';
import Axios from 'axios';
import Table from '../table/table.js';
import { SERVER_API, TIMEOUTS } from '../constants';

export default function Game(props) {  
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState();
  const [field, setField] = useState([]);  
  const [currentPlayer, setCurrentPlayer] = useState({});
  const [playerList, setPlayerList] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      Axios.get(SERVER_API.game.getState).then(res => {
        const { winner, field, currentPlayer, playerList } = res.data;
        !currentPlayer && (window.location.hash = '#/');

        setLoading(false);
        setWinner(winner);
        setField(field);
        setCurrentPlayer(currentPlayer);
        setPlayerList(playerList);          
      });
    }, TIMEOUTS.serverUpdate);

    return () => clearInterval(interval);
  }, []);

  const currentUser = JSON.parse(localStorage.getItem('userData'));
  const [player1, player2] = playerList;  
  
  const handleApiError = (err) => console.error(err);
  const restart = () => Axios.post(SERVER_API.game.resetState).catch(handleApiError);
  const move = (columnId) => {
    if (!winner && currentUser.id === currentPlayer.id && field[columnId].indexOf(0) >= 0) {
      Axios.post(SERVER_API.game.setState , { columnId, currentPlayer }).catch(handleApiError);;
    }
  };
  
  return (
    <div className="Game">
      {(loading || playerList.length === 0) ? <p>loading...</p> : (
        <>
        {winner && <h1>{winner.name} won!</h1>}

        <p>{player1.name} vs {player2.name}</p>
        {currentPlayer.id === currentUser.id ? (
          <p>Your turn! Hurry up!</p>
        ) : (
          <p>Please wait for {currentPlayer.name}'s turn</p>
        )}
        <Table
          onColumnPress={move}
          currentPlayer={currentPlayer}
          field={field}
        />
        {winner && <button onClick={restart}>Restart</button>}
        </>
      )}
    </div>
  );
};
