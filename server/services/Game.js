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

const checkForWinner = (verticalField, currentPlayer) => {
  const winCombo = currentPlayer.name.repeat(4);
  const horizontalField = new Array(verticalField[0].length).fill([]).map((_subArr, index) => verticalField.map(column => column[index]));

  if (
    horizontalOrVerticalComboCheck(verticalField, winCombo) ||
    horizontalOrVerticalComboCheck(horizontalField, winCombo) ||
    diagonalComboCheck(verticalField, currentPlayer.name)
  ) {
    return currentPlayer; // returning the winner
  }
};

const horizontalOrVerticalComboCheck = (field, combo) => field.map(column => column.join('')).some(colAsString => colAsString.indexOf(combo) >= 0);

const diagonalComboCheck = (field, keyword) => {
  let rMatchCount = 0;
  let lMatchCount = 0;
  
  for (let columnIndex = 0; columnIndex < field.length; columnIndex++) {
    rMatchCount = 0;
    lMatchCount = 0;
    const column = field[columnIndex];
    if (column.indexOf(keyword) >= 0) {
      for (let itemIndex = 0; itemIndex < column.length; itemIndex++) {
        const item = column[itemIndex];
        if (item === keyword) {
          if (
            checkForDiagonalMatch(columnIndex, itemIndex, 'right', field, keyword, rMatchCount) ||
            checkForDiagonalMatch(columnIndex, itemIndex, 'not-right =)', field, keyword, lMatchCount)
          ) {
            return true; // the combo was found
          }
        }
      }
    }
  }
};

const checkForDiagonalMatch = (prevColumnIndex, prevItemIndex, direction, field, keyword, matchCount) => {
  const currentColumnIndex = prevColumnIndex + 1;
  const targetItemIndex = direction === 'right' ? prevItemIndex + 1 : prevItemIndex - 1;  
  if (field[currentColumnIndex] && field[currentColumnIndex][targetItemIndex] === keyword) {
    matchCount++
    return matchCount < 3 ? checkForDiagonalMatch(currentColumnIndex, targetItemIndex, direction, field, keyword, matchCount) : true;
  }
};

module.exports = {
  getNewField,
  checkForWinner
};