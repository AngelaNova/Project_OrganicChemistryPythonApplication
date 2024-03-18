// Function to check if a number is valid to be placed in a specific cell
function isValidMove(board, row, col, num) {
  // Check if the number is already present in the same row
  for (let i = 0; i < 9; i++) {
      if (i !== col && board[row][i] === num) {
          return false;
      }
  }

  // Check if the number is already present in the same column
  for (let i = 0; i < 9; i++) {
      if (i !== row && board[i][col] === num) {
          return false;
      }
  }

  // Check if the number is already present in the same 3x3 block
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
          if ((i !== row || j !== col) && board[i][j] === num) {
              return false;
          }
      }
  }

  return true; // Number is valid
}

// Function to solve Sudoku puzzle using backtracking
function solveSudoku(board) {
  const emptyCell = findEmptyCell(board);
  if (!emptyCell) {
      return true; // Puzzle solved successfully
  }

  const [row, col] = emptyCell;

  for (let num = 1; num <= 9; num++) {
      if (isValidMove(board, row, col, num)) {
          board[row][col] = num;

          if (solveSudoku(board)) {
              return true;
          }

          board[row][col] = 0; // Backtrack
      }
  }

  return false; // No solution found
}

// Function to find an empty cell in the Sudoku board
function findEmptyCell(board) {
  for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
              return [row, col];
          }
      }
  }
  return null; // No empty cell found
}

// Function to generate a Sudoku puzzle based on difficulty level
function generateSudoku(difficulty) {
  const board = [];
  for (let i = 0; i < 9; i++) {
      board.push(new Array(9).fill(0));
  }

  // Solve the blank puzzle to get a solution
  solveSudoku(board);

  // Define number of cells to remove based on difficulty level
  let cellsToRemove = 0;
  switch (difficulty) {
      case "easy":
          cellsToRemove = 25;
          break;
      case "medium":
          cellsToRemove = 35;
          break;
      case "hard":
          cellsToRemove = 45;
          break;
      case "super-hard":
          cellsToRemove = 55;
          break;
      default:
          cellsToRemove = 35; // Default to medium difficulty
          break;
  }

  // Remove numbers to create the puzzle
  let cellsRemoved = 0;
  while (cellsRemoved < cellsToRemove) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);

      if (board[row][col] !== 0) {
          board[row][col] = 0;
          cellsRemoved++;
      }
  }

  return board;
}

// Function to reset the Sudoku board
function resetSudoku() {
  const sudokuBoard = document.getElementById("sudoku-board");
  sudokuBoard.innerHTML = ""; // Clear the board
  initializeSudokuGrid(); // No difficulty parameter needed here
}

// Function to initialize the Sudoku grid
function initializeSudokuGrid(difficulty = "easy") { // Set default difficulty to "easy"
  const board = generateSudoku(difficulty); // Pass difficulty to generateSudoku
  const sudokuBoard = document.getElementById("sudoku-board");

  for (let i = 0; i < 9; i++) {
      const row = document.createElement("tr");

      for (let j = 0; j < 9; j++) {
          const cell = document.createElement("td");
          const input = document.createElement("input");

          input.type = "number";
          input.min = "1";
          input.max = "9";
          input.dataset.row = i;
          input.dataset.col = j;

          if (board[i][j] !== 0) {
              input.value = board[i][j];
              input.readOnly = true; // Make pre-filled cells non-editable
          }

          input.addEventListener("input", function() {
              // Update the board when the player inputs a number
              board[i][j] = parseInt(this.value) || 0;
          });

          cell.appendChild(input);
          row.appendChild(cell);
      }

      sudokuBoard.appendChild(row);
  }
}

// Call the initializeSudokuGrid function to start the game with a specified difficulty
initializeSudokuGrid(); // Default difficulty is "easy"
