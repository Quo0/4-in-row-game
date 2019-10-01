const express = require('express');
const router = express.Router();
const { gameState, resetGameState } = require('../services/Store.js');

router.get('/get-state', (_req, res) => {
  res.send(gameState);
});

router.post('/set-state', (req, res) => {
  gameState.field = getNewField(gameState.field, req.body.columnId, req.body.currentPlayer.name);
  gameState.currentPlayer = gameState.currentPlayer.id === gameState.playerList[0].id ? gameState.playerList[1] : gameState.playerList[0];
  gameState.winner = checkForWinner(gameState.field, gameState.playerList);
  res.sendStatus(200);
});

router.post('/reset-state', (_req, res) => {
  resetGameState();
  res.sendStatus(200);
});

const getNewField = (field, columnId, newValue) => [  
  ...field.slice(0, columnId),
  addNewChipToArray(field[columnId], newValue),        
  ...field.slice(columnId + 1)
];
const addNewChipToArray = (column, newValue) => [
  ...column.slice(0, column.indexOf(0)),
  newValue,
  ...column.slice(column.indexOf(0) + 1)
];

const checkForWinner = (verticalField, [ player1, player2 ]) => {
  const user1winCombo = player1.name.repeat(4), user2winCombo = player2.name.repeat(4);
  const horizontalField = new Array(verticalField[0].length).fill([]).map((_subArr, index) => verticalField.map(column => column[index]));

  const user1Won = checkFieldHasWinCombo(verticalField, user1winCombo) || checkFieldHasWinCombo(horizontalField, user1winCombo);
  const user2Won = checkFieldHasWinCombo(verticalField, user2winCombo) || checkFieldHasWinCombo(horizontalField, user2winCombo);

  return user1Won ? player1 : user2Won ? player2 : null;
};
const checkFieldHasWinCombo = (field, combo) => field.map(column => column.join('')).some(colAsString => colAsString.indexOf(combo) >= 0);

module.exports = router;