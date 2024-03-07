const canvas = document.getElementById("noiseCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const perlinImageData = ctx.createImageData(canvas.width, canvas.height);
const iterations = 5;
const startingFrequency = 256;

for (let y = 0; y < canvas.height; y++) {
  for (let x = 0; x < canvas.width; x++) {
    const i = (y * perlinImageData.width + x) * 4;
    let X = x / startingFrequency;
    let Y = y / startingFrequency;
    let amplitude = 160;
    let value = 0;

    for (let j = 0; j < iterations; j++) {
      value += (simplex(X, Y) + 1) * 0.5 * amplitude;

      X *= 2;
      Y *= 2;
      amplitude *= 0.5;
    }

    perlinImageData.data[i] = value;
    perlinImageData.data[i + 1] = value;
    perlinImageData.data[i + 2] = value;
    perlinImageData.data[i + 3] = 255;
  }
}

ctx.putImageData(perlinImageData, 0, 0);
