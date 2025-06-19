const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Initialize cubes with grid positioning
cubes.forEach((cube, index) => {
  const col = index % 4;
  const row = Math.floor(index / 4);
  cube.style.left = `${10 + col * 80}px`;  // including gap
  cube.style.top = `${10 + row * 80}px`;
});

// Mouse down
cubes.forEach(cube => {
  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;
    cube.style.zIndex = 1000; // Bring to front
    cube.style.cursor = 'grabbing';
  });
});

// Mouse move
document.addEventListener('mousemove', (e) => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeWidth = selectedCube.offsetWidth;
  const cubeHeight = selectedCube.offsetHeight;

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  x = Math.max(0, Math.min(container.clientWidth - cubeWidth, x));
  y = Math.max(0, Math.min(container.clientHeight - cubeHeight, y));

  selectedCube.style.left = `${x}px`;
  selectedCube.style.top = `${y}px`;
});

// Mouse up
document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.cursor = 'grab';
    selectedCube = null;
  }
});
