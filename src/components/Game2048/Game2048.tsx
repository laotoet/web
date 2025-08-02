'use client';

import { useState, useEffect, useCallback } from 'react';
import { GameState, Position } from '@/types';

const Game2048: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: [],
    score: 0,
    isGameOver: false,
    isWon: false,
  });

  const [animatingCells, setAnimatingCells] = useState<Set<string>>(new Set());

  // Initialize empty board
  const initializeBoard = (): number[][] => {
    return Array(4).fill(null).map(() => Array(4).fill(0));
  };

  // Add random tile (2 or 4)
  const addRandomTile = (board: number[][]): number[][] => {
    const emptyCells: Position[] = [];

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] === 0) {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length === 0) return board;

    const newBoard = board.map(row => [...row]);
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    newBoard[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;

    return newBoard;
  };

  // Initialize game
  const initializeGame = useCallback(() => {
    let board = initializeBoard();
    board = addRandomTile(board);
    board = addRandomTile(board);

    setGameState({
      board,
      score: 0,
      isGameOver: false,
      isWon: false,
    });
  }, []);

  // Check if game is over
  const isGameOver = (board: number[][]): boolean => {
    // Check for empty cells
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] === 0) return false;
      }
    }

    // Check for possible merges
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const current = board[row][col];
        if (
          (col < 3 && board[row][col + 1] === current) ||
          (row < 3 && board[row + 1][col] === current)
        ) {
          return false;
        }
      }
    }

    return true;
  };

  // Check if player won
  const checkWin = (board: number[][]): boolean => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] === 2048) return true;
      }
    }
    return false;
  };

  // Move tiles
  const moveTiles = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameState.isGameOver) return;

    let newBoard = gameState.board.map(row => [...row]);
    let newScore = gameState.score;
    let moved = false;

    const slideArray = (arr: number[]): { array: number[], score: number } => {
      const filtered = arr.filter(val => val !== 0);
      const missing = 4 - filtered.length;
      const zeros = Array(missing).fill(0);
      // eslint-disable-next-line prefer-const
      let merged = [...filtered, ...zeros];
      let scoreIncrease = 0;

      for (let i = 0; i < 3; i++) {
        if (merged[i] !== 0 && merged[i] === merged[i + 1]) {
          merged[i] *= 2;
          merged[i + 1] = 0;
          scoreIncrease += merged[i];
        }
      }

      const afterMerge = merged.filter(val => val !== 0);
      const missingAfterMerge = 4 - afterMerge.length;
      const zerosAfterMerge = Array(missingAfterMerge).fill(0);

      return {
        array: [...afterMerge, ...zerosAfterMerge],
        score: scoreIncrease
      };
    };

    switch (direction) {
      case 'left':
        for (let row = 0; row < 4; row++) {
          const result = slideArray(newBoard[row]);
          if (JSON.stringify(result.array) !== JSON.stringify(newBoard[row])) {
            moved = true;
            newBoard[row] = result.array;
            newScore += result.score;
          }
        }
        break;

      case 'right':
        for (let row = 0; row < 4; row++) {
          const reversed = [...newBoard[row]].reverse();
          const result = slideArray(reversed);
          const final = result.array.reverse();
          if (JSON.stringify(final) !== JSON.stringify(newBoard[row])) {
            moved = true;
            newBoard[row] = final;
            newScore += result.score;
          }
        }
        break;

      case 'up':
        for (let col = 0; col < 4; col++) {
          const column = [newBoard[0][col], newBoard[1][col], newBoard[2][col], newBoard[3][col]];
          const result = slideArray(column);
          if (JSON.stringify(result.array) !== JSON.stringify(column)) {
            moved = true;
            for (let row = 0; row < 4; row++) {
              newBoard[row][col] = result.array[row];
            }
            newScore += result.score;
          }
        }
        break;

      case 'down':
        for (let col = 0; col < 4; col++) {
          const column = [newBoard[0][col], newBoard[1][col], newBoard[2][col], newBoard[3][col]];
          const reversed = [...column].reverse();
          const result = slideArray(reversed);
          const final = result.array.reverse();
          if (JSON.stringify(final) !== JSON.stringify(column)) {
            moved = true;
            for (let row = 0; row < 4; row++) {
              newBoard[row][col] = final[row];
            }
            newScore += result.score;
          }
        }
        break;
    }

    if (moved) {
      newBoard = addRandomTile(newBoard);
      const won = checkWin(newBoard);
      const gameOver = isGameOver(newBoard);

      setGameState({
        board: newBoard,
        score: newScore,
        isGameOver: gameOver,
        isWon: won,
      });

      // Trigger animation
      setAnimatingCells(new Set());
      setTimeout(() => {
        const allCells = new Set<string>();
        for (let row = 0; row < 4; row++) {
          for (let col = 0; col < 4; col++) {
            if (newBoard[row][col] !== 0) {
              allCells.add(`${row}-${col}`);
            }
          }
        }
        setAnimatingCells(allCells);
      }, 50);

      setTimeout(() => setAnimatingCells(new Set()), 150);
    }
  }, [gameState]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveTiles('left');
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveTiles('right');
          break;
        case 'ArrowUp':
          e.preventDefault();
          moveTiles('up');
          break;
        case 'ArrowDown':
          e.preventDefault();
          moveTiles('down');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moveTiles]);

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Get tile color
  const getTileColor = (value: number): string => {
    const colors: { [key: number]: string } = {
      0: 'bg-gray-200',
      2: 'bg-gray-100 text-gray-800',
      4: 'bg-gray-200 text-gray-800',
      8: 'bg-orange-200 text-orange-800',
      16: 'bg-orange-300 text-orange-900',
      32: 'bg-orange-400 text-white',
      64: 'bg-orange-500 text-white',
      128: 'bg-yellow-300 text-white font-bold',
      256: 'bg-yellow-400 text-white font-bold',
      512: 'bg-yellow-500 text-white font-bold',
      1024: 'bg-yellow-600 text-white font-bold text-sm',
      2048: 'bg-yellow-700 text-white font-bold text-sm animate-pulse',
    };

    return colors[value] || 'bg-purple-500 text-white font-bold text-sm';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">2048 Game</h1>
        <div className="flex justify-center items-center space-x-8">
          <div className="text-lg font-semibold">
            <span className="text-gray-600">Score: </span>
            <span className="text-blue-600">{gameState.score}</span>
          </div>
          <button
            onClick={initializeGame}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            New Game
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-4 gap-2 p-4 bg-gray-300 rounded-lg">
          {gameState.board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-16 h-16 flex items-center justify-center rounded-lg font-bold text-lg
                  transition-all duration-150 ease-in-out
                  ${getTileColor(cell)}
                  ${animatingCells.has(`${rowIndex}-${colIndex}`) ? 'scale-110' : 'scale-100'}
                  ${cell === 0 ? '' : 'shadow-lg'}
                `}
              >
                {cell !== 0 && cell}
              </div>
            ))
          )}
        </div>

        {/* Game Over Overlay */}
        {(gameState.isGameOver || gameState.isWon) && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <div className="bg-white p-6 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">
                {gameState.isWon ? '🎉 You Won!' : '😞 Game Over'}
              </h2>
              <p className="text-gray-600 mb-4">Final Score: {gameState.score}</p>
              <button
                onClick={initializeGame}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-gray-600 max-w-md">
        <p className="text-sm">
          Use arrow keys to move tiles. When two tiles with the same number touch, they merge into one!
        </p>
        <p className="text-xs mt-2">
          Goal: Reach the 2048 tile to win the game.
        </p>
      </div>
    </div>
  );
};

export default Game2048;
