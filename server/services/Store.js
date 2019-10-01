const initialFieldState = [
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0]
];

const queueState = {
  canStartConfirmation: false,
  confirmed: false,

  players: {
    all: [],
    pending: [],
    confirmed: []
  },
};

const gameState = {
  winner: null,
  field: [...initialFieldState],
  currentPlayer: '',
  playerList: []
};

const resetGameState = () => {
  gameState.winner = null;
  gameState.field = [...initialFieldState];
};

module.exports = {  
  queueState,
  gameState,
  resetGameState
};