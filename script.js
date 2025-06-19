const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Set initial positions manually (2x2 grid layout)
const positions = [
  { left: 10, top: 10 },
  { left: 90, top: 10 },
  { left: 10, top: 90 },
  { left: 90, top: 90 }
];

cubes.forEach((cube, index) => {
  cube.style.left = `${positions[index].left}px`;
  cube.style.top = `${positions[index].top}px`;

  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    cube.style.cursor = 'grabbing';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  const cubeWidth = selectedCube.offsetWidth;
  const cubeHeight = selectedCube.offsetHeight;

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Constrain within container
  x = Math.max(0, Math.min(container.clientWidth - cubeWidth, x));
  y = Math.max(0, Math.min(container.clientHeight - cubeHeight, y));

  selectedCube.style.left = `${x}px`;
  selectedCube.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.cursor = 'grab';
    selectedCube = null;
  }
});
