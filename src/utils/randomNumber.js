export function getRandomInt(min, max) {
  // Use Math.random() to generate a random number between 0 and 1 (exclusive)
  // Multiply by (max - min + 1) to get a number in the range of (0, max - min + 1)
  // Use Math.floor() to round down to the nearest integer

  return Math.floor(Math.random() * (max - min + 1)) + min;
}


