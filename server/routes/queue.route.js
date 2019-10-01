const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4');
const { gameState, queueState } = require('../services/Store.js');

let confirmTimerId;

router.get('/state', (_req, res) => {
  res.send(queueState);
});

router.post('/register', (req, res) => {
  const newUser = {
    id: uuid(),
    name: req.body.userName
  };
  queueState.players.all.push(newUser);
  res.send(newUser);
});

router.post('/join/:id', (req, res) => {
  const userId = req.params.id
  const user = queueState.players.all.find(user => user.id === userId);
  queueState.players.pending.push(user);
  if (queueState.players.pending.length >= 2 && !queueState.canStartConfirmation) {
    queueState.canStartConfirmation = true;
    
    confirmTimerId = setTimeout(() => {
      queueState.canStartConfirmation = false;
      queueState.players.pending = [];
      queueState.players.confirmed = [];
    }, 5000);      
  }
  res.sendStatus(200);
});

router.post('/leave/:id', (req, res) => {
  const userId = req.params.id;
  queueState.players.pending = queueState.players.pending.filter(user => user.id !== userId);
  res.sendStatus(200);
});

router.post('/confirm/:id', (req, res) => {
  const userId = req.params.id;
  const user = queueState.players.all.find(user => user.id === userId);  
  queueState.players.confirmed.push(user);

  if (queueState.players.confirmed.length === 2) {
    queueState.confirmed = true;
    gameState.playerList = [...queueState.players.confirmed];
    gameState.currentPlayer = gameState.playerList[0];
  }
  res.sendStatus(200);
});

router.post('/decline', (_req, res) => {
  clearTimeout(confirmTimerId);
  queueState.canStartConfirmation = false;
  queueState.players.pending = [];
  queueState.players.confirmed = [];
  res.sendStatus(200);
});

module.exports = router;