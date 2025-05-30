import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // 3x3 board state: array of 9 cells, null | 'X' | 'O'
  const [board, setBoard] = useState(Array(9).fill(null));
  // Current player: true=X, false=O
  const [xIsNext, setXIsNext] = useState(true);
  // Game over state: null | 'X' | 'O' | 'draw'
  const [gameStatus, setGameStatus] = useState(null);

  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    if (board[idx] || gameStatus) return; // Ignore if already filled or game done
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? 'X' : 'O';
    setBoard(nextBoard);

    const winner = calculateWinner(nextBoard);
    if (winner) {
      setGameStatus(winner);
    } else if (nextBoard.every(cell => cell)) {
      setGameStatus('draw');
    } else {
      setXIsNext(!xIsNext);
    }
  }

  // PUBLIC_INTERFACE
  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameStatus(null);
  }

  // PUBLIC_INTERFACE
  function calculateWinner(sq) {
    const lines = [
      [0,1,2], [3,4,5], [6,7,8], // Rows
      [0,3,6], [1,4,7], [2,5,8], // Cols
      [0,4,8], [2,4,6], // Diags
    ];
    for (let [a,b,c] of lines) {
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
    }
    return null;
  }

  // Branding colors & theme
  const COLORS = {
    primary: "#ffffff",
    secondary: "#222222",
    accent: "#4caf50",
  };

  // Status message
  let status;
  if (gameStatus === 'draw') {
    status = <span style={{ color: COLORS.secondary }}>It's a draw!</span>;
  } else if (gameStatus === 'X' || gameStatus === 'O') {
    status = (
      <span style={{ color: COLORS.accent }}>
        Player {gameStatus} wins!
      </span>
    );
  } else {
    status = (
      <span style={{ color: COLORS.secondary }}>
        Turn: <b>Player {xIsNext ? 'X' : 'O'}</b>
      </span>
    );
  }

  // Minimal CSS-in-JS for TicTacToe grid & responsiveness
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 70px)",
    gridTemplateRows: "repeat(3, 70px)",
    gap: "12px",
    background: COLORS.primary,
    padding: '24px',
    borderRadius: '16px',
    boxShadow: '0 2px 16px 0 rgba(34,34,34,0.06)',
    justifyContent: "center",
    alignItems: "center"
  };

  const cellStyle = idx => ({
    width: 70,
    height: 70,
    fontSize: "2.5rem",
    color: board[idx]==="X"?COLORS.accent:COLORS.secondary,
    background: "#fff",
    border: `2px solid ${COLORS.secondary}`,
    borderRadius: '8px',
    cursor: board[idx] || gameStatus ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    transition: "color 0.2s",
    userSelect: "none",
    outline: (gameStatus === "X" || gameStatus === "O") && (calculateWinner(board) && calculateWinner(board)===board[idx]) ? `2px solid ${COLORS.accent}` : undefined
  });

  // Main layout: center everything
  return (
    <div
      className="app"
      style={{
        minHeight: "100vh",
        background: COLORS.primary,
        color: COLORS.secondary,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Minimalist local NavBar */}
      <nav
        className="navbar"
        style={{
          background: COLORS.primary,
          color: COLORS.secondary,
          borderBottom: `1px solid ${COLORS.secondary}20`,
          padding: "16px 0",
          marginBottom: "32px"
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center" }}>
          <div className="logo" style={{ fontWeight: 600, fontSize: "1.1rem", color: COLORS.secondary }}>
            <span className="logo-symbol" style={{ color: COLORS.accent, fontWeight: 800, fontSize: '1.5rem' }}>◻</span>&nbsp;TicTacToe Classic
          </div>
        </div>
      </nav>

      {/* Game Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{
          width: '100vw', maxWidth: '100%', margin: '0 auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div className="subtitle" style={{
            fontWeight: 600,
            fontSize: "1.1rem",
            marginBottom: "20px",
            color: COLORS.accent
          }}>
            {status}
          </div>
          <div
            style={gridStyle}
            role="grid"
            aria-label="TicTacToe board"
          >
            {board.map((cell, idx) => (
              <button
                key={idx}
                aria-label={`cell ${idx}`}
                style={cellStyle(idx)}
                onClick={() => handleCellClick(idx)}
                disabled={!!cell || !!gameStatus}
              >
                {cell}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', width: '100%' }}>
            <button
              className="btn btn-large"
              style={{
                backgroundColor: COLORS.accent,
                color: "#fff",
                fontWeight: 600,
                fontSize: "1.1rem",
                borderRadius: '6px',
                padding: '12px 26px',
                border: 'none',
                boxShadow: '0 1px 6px 0 #ddd3',
                cursor: "pointer"
              }}
              onClick={resetGame}
            >
              Reset Game
            </button>
          </div>
          <div style={{ marginTop: 16, fontSize: "0.98rem", color: "#888" }}>
            Two players take alternate turns. First to align three in a row wins!
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
