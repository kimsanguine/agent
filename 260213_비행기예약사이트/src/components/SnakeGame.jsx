import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  createInitialGameState,
  directionFromKey,
  DIRECTIONS,
  GRID_SIZE,
  getSafeDirection,
  stepGame,
} from '../game/snakeLogic';
import './SnakeGame.css';

const TICK_MS = 140;

function SnakeGame() {
  const [game, setGame] = useState(() => createInitialGameState());
  const [isPaused, setIsPaused] = useState(false);

  const occupiedCells = useMemo(() => {
    const set = new Set();
    game.snake.forEach((segment) => {
      set.add(`${segment.x},${segment.y}`);
    });
    return set;
  }, [game.snake]);

  const setDirection = useCallback((direction) => {
    setGame((prev) => ({
      ...prev,
      nextDirection: getSafeDirection(prev.direction, direction),
    }));
  }, []);

  const restart = useCallback(() => {
    setGame(createInitialGameState());
    setIsPaused(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      const direction = directionFromKey(event.key);
      if (direction) {
        event.preventDefault();
        setDirection(direction);
        return;
      }

      if (event.key === ' ') {
        event.preventDefault();
        setIsPaused((prev) => !prev);
      }

      if ((event.key === 'r' || event.key === 'R') && game.status !== 'running') {
        event.preventDefault();
        restart();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [game.status, restart, setDirection]);

  useEffect(() => {
    if (game.status !== 'running' || isPaused) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setGame((prev) => stepGame(prev));
    }, TICK_MS);

    return () => window.clearInterval(timer);
  }, [game.status, isPaused]);

  return (
    <section id="snake" className="snake-section">
      <div className="container">
        <div className="snake-panel glass">
          <div className="snake-header">
            <div>
              <h2 className="snake-title">Classic Snake</h2>
              <p className="snake-subtitle">Arrows/WASD to move, Space to pause</p>
            </div>
            <div className="snake-stats">
              <span>Score: {game.score}</span>
              <span>Status: {game.status === 'gameover' ? 'Game Over' : game.status === 'won' ? 'You Win' : isPaused ? 'Paused' : 'Running'}</span>
            </div>
          </div>

          <div
            className="snake-grid"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
            role="img"
            aria-label="Snake game grid"
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
              const x = index % GRID_SIZE;
              const y = Math.floor(index / GRID_SIZE);
              const key = `${x},${y}`;
              const isHead = game.snake[0]?.x === x && game.snake[0]?.y === y;
              const isBody = occupiedCells.has(key) && !isHead;
              const isFood = game.food?.x === x && game.food?.y === y;

              return (
                <div
                  key={key}
                  className={`snake-cell${isHead ? ' head' : ''}${isBody ? ' body' : ''}${isFood ? ' food' : ''}`}
                />
              );
            })}
          </div>

          <div className="snake-actions">
            <button
              type="button"
              className="snake-btn"
              onClick={() => setIsPaused((prev) => !prev)}
              disabled={game.status !== 'running'}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button type="button" className="snake-btn primary" onClick={restart}>
              Restart
            </button>
          </div>

          <div className="snake-dpad" aria-label="On-screen controls">
            <button type="button" className="snake-btn" onClick={() => setDirection(DIRECTIONS.UP)}>Up</button>
            <div className="snake-dpad-row">
              <button type="button" className="snake-btn" onClick={() => setDirection(DIRECTIONS.LEFT)}>Left</button>
              <button type="button" className="snake-btn" onClick={() => setDirection(DIRECTIONS.DOWN)}>Down</button>
              <button type="button" className="snake-btn" onClick={() => setDirection(DIRECTIONS.RIGHT)}>Right</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SnakeGame;
