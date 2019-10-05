const express = require('express');
const router = express.Router();
const Game = require('../services/Game.js');
const { gameState, resetGameState } = require('../services/Store.js');

router.get('/get-state', (_req, res) => {
  res.send(gameState);
});

router.post('/set-state', (req, res) => {
  gameState.field = Game.getNewField(gameState.field, req.body.columnId, req.body.currentPlayer.name);
  gameState.winner = Game.checkForWinner(gameState.field, gameState.currentPlayer);
  gameState.currentPlayer = gameState.currentPlayer.id === gameState.playerList[0].id ? gameState.playerList[1] : gameState.playerList[0];
  res.sendStatus(200);
});

router.post('/reset-state', (_req, res) => {
  resetGameState();
  res.sendStatus(200);
});

module.exports = router;