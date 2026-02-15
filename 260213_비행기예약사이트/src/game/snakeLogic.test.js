import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DIRECTIONS,
  getSafeDirection,
  GRID_SIZE,
  spawnFood,
  stepGame,
} from './snakeLogic.js';

test('getSafeDirection blocks direct reversal', () => {
  const direction = getSafeDirection(DIRECTIONS.RIGHT, DIRECTIONS.LEFT);
  assert.deepEqual(direction, DIRECTIONS.RIGHT);
});

test('stepGame moves snake and keeps length when no food is eaten', () => {
  const state = {
    snake: [
      { x: 4, y: 4 },
      { x: 3, y: 4 },
      { x: 2, y: 4 },
    ],
    direction: DIRECTIONS.RIGHT,
    nextDirection: DIRECTIONS.RIGHT,
    food: { x: 10, y: 10 },
    score: 0,
    status: 'running',
  };

  const next = stepGame(state);
  assert.deepEqual(next.snake[0], { x: 5, y: 4 });
  assert.equal(next.snake.length, 3);
  assert.equal(next.score, 0);
  assert.equal(next.status, 'running');
});

test('stepGame grows snake and increments score when food is eaten', () => {
  const state = {
    snake: [
      { x: 4, y: 4 },
      { x: 3, y: 4 },
      { x: 2, y: 4 },
    ],
    direction: DIRECTIONS.RIGHT,
    nextDirection: DIRECTIONS.RIGHT,
    food: { x: 5, y: 4 },
    score: 0,
    status: 'running',
  };

  const next = stepGame(state, () => 0);
  assert.deepEqual(next.snake[0], { x: 5, y: 4 });
  assert.equal(next.snake.length, 4);
  assert.equal(next.score, 1);
  assert.equal(next.status, 'running');
});

test('stepGame sets gameover on wall collision', () => {
  const state = {
    snake: [
      { x: GRID_SIZE - 1, y: 2 },
      { x: GRID_SIZE - 2, y: 2 },
      { x: GRID_SIZE - 3, y: 2 },
    ],
    direction: DIRECTIONS.RIGHT,
    nextDirection: DIRECTIONS.RIGHT,
    food: { x: 0, y: 0 },
    score: 2,
    status: 'running',
  };

  const next = stepGame(state);
  assert.equal(next.status, 'gameover');
});

test('stepGame sets gameover on self collision', () => {
  const state = {
    snake: [
      { x: 3, y: 3 },
      { x: 3, y: 4 },
      { x: 2, y: 4 },
      { x: 2, y: 3 },
    ],
    direction: DIRECTIONS.LEFT,
    nextDirection: DIRECTIONS.DOWN,
    food: { x: 0, y: 0 },
    score: 3,
    status: 'running',
  };

  const next = stepGame(state);
  assert.equal(next.status, 'gameover');
});

test('spawnFood never returns a coordinate occupied by the snake', () => {
  const snake = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ];

  const food = spawnFood(snake, 4, () => 0);
  assert.notDeepEqual(food, { x: 0, y: 0 });
  assert.notDeepEqual(food, { x: 1, y: 0 });
  assert.notDeepEqual(food, { x: 2, y: 0 });
});
