// Create 9x9 grid dynamically
const table = document.querySelector("table tbody");
for (let row = 0; row < 9; row++) {
  const tr = document.createElement("tr");
  for (let col = 0; col < 9; col++) {
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("min", "1");
    input.setAttribute("max", "9");
    input.setAttribute("id", `cell-${row}-${col}`);
    td.appendChild(input);
    tr.appendChild(td);
  }
  table.appendChild(tr);
}

// Get grid from inputs
function getGrid() {
  let grid = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      let val = document.getElementById(`cell-${i}-${j}`).value;
      row.push(val === "" ? 0 : parseInt(val));
    }
    grid.push(row);
  }
  return grid;
}

// Set grid to inputs
function setGrid(grid) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      document.getElementById(`cell-${i}-${j}`).value = grid[i][j] || "";
    }
  }
}

// Check if number can be placed
function isValid(grid, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num || grid[x][col] === num) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (grid[startRow + i][startCol + j] === num) return false;
  return true;
}
function isValidGrid(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      let num = grid[row][col];
      if (num !== 0) {
        grid[row][col] = 0; // Temporarily clear to check
        if (!isValid(grid, row, col, num)) {
          return false;
        }
        grid[row][col] = num;
      }
    }
  }
  return true;
}


// Backtracking Sudoku Solver
function solve(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solve(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solveSudoku() {
  let grid = getGrid();
  const msg = document.getElementById("message");
  msg.textContent = "⏳ Solving...";
  msg.style.color = "blue";

  setTimeout(() => {
    if (!isValidGrid(grid)) {
      msg.textContent = " Invalid input: Duplicates found.";
      msg.style.color = "red";
      return;
    }if (solve(grid)) {
      setGrid(grid);
      msg.textContent = " Sudoku Solved!";
      msg.style.color = "green";
    } else {
      msg.textContent = " No solution found.";
      msg.style.color = "red";
    }
  }, 100); 
}

function resetGrid() {
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      document.getElementById(`cell-${i}-${j}`).value = "";
  const msg = document.getElementById("message");
    msg.textContent = "";

}
