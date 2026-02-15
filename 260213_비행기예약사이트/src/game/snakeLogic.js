export const GRID_SIZE = 16;

export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const START_SNAKE = [
  { x: 8, y: 8 },
  { x: 7, y: 8 },
  { x: 6, y: 8 },
];

function samePoint(a, b) {
  return a.x === b.x && a.y === b.y;
}

export function getSafeDirection(currentDirection, nextDirection) {
  if (!nextDirection) {
    return currentDirection;
  }

  const isReverse =
    currentDirection.x + nextDirection.x === 0 &&
    currentDirection.y + nextDirection.y === 0;

  return isReverse ? currentDirection : nextDirection;
}

export function spawnFood(snake, gridSize = GRID_SIZE, randomFn = Math.random) {
  const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`));
  const freeCells = [];

  for (let y = 0; y < gridSize; y += 1) {
    for (let x = 0; x < gridSize; x += 1) {
      const key = `${x},${y}`;
      if (!occupied.has(key)) {
        freeCells.push({ x, y });
      }
    }
  }

  if (freeCells.length === 0) {
    return null;
  }

  const index = Math.floor(randomFn() * freeCells.length);
  return freeCells[Math.min(index, freeCells.length - 1)];
}

export function createInitialGameState(randomFn = Math.random) {
  const snake = [...START_SNAKE];
  return {
    snake,
    direction: DIRECTIONS.RIGHT,
    nextDirection: DIRECTIONS.RIGHT,
    food: spawnFood(snake, GRID_SIZE, randomFn),
    score: 0,
    status: 'running',
  };
}

export function stepGame(state, randomFn = Math.random) {
  if (state.status !== 'running') {
    return state;
  }

  const direction = getSafeDirection(state.direction, state.nextDirection);
  const head = state.snake[0];
  const nextHead = {
    x: head.x + direction.x,
    y: head.y + direction.y,
  };

  const hitsWall =
    nextHead.x < 0 ||
    nextHead.y < 0 ||
    nextHead.x >= GRID_SIZE ||
    nextHead.y >= GRID_SIZE;

  if (hitsWall) {
    return {
      ...state,
      direction,
      status: 'gameover',
    };
  }

  const willEat = state.food && samePoint(nextHead, state.food);
  const bodyToCheck = willEat ? state.snake : state.snake.slice(0, -1);
  const hitsSelf = bodyToCheck.some((segment) => samePoint(segment, nextHead));

  if (hitsSelf) {
    return {
      ...state,
      direction,
      status: 'gameover',
    };
  }

  const movedSnake = [nextHead, ...state.snake];
  if (!willEat) {
    movedSnake.pop();
  }

  const nextFood = willEat
    ? spawnFood(movedSnake, GRID_SIZE, randomFn)
    : state.food;

  return {
    ...state,
    snake: movedSnake,
    direction,
    food: nextFood,
    score: willEat ? state.score + 1 : state.score,
    status: nextFood ? 'running' : 'won',
  };
}

export function directionFromKey(key) {
  switch (key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      return DIRECTIONS.UP;
    case 'ArrowDown':
    case 's':
    case 'S':
      return DIRECTIONS.DOWN;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      return DIRECTIONS.LEFT;
    case 'ArrowRight':
    case 'd':
    case 'D':
      return DIRECTIONS.RIGHT;
    default:
      return null;
  }
}
