// Generates full alphabet sequence for modular plunder board (A..Z, AA..AZ, etc.)
export function generateFullAlphabetSequence(count) {
  const alphabet = [];
  let current = 0;
  while (alphabet.length < count) {
    let letter = '';
    let num = current;
    do {
      letter = String.fromCharCode(65 + (num % 26)) + letter;
      num = Math.floor(num / 26) - 1;
    } while (num >= 0);
    alphabet.push(letter);
    current++;
  }
  return alphabet;
}

export const MAX_ALPHABET_CACHE = generateFullAlphabetSequence(72);

export function calculateGridBounds(alphabetTiles, numberTiles) {
  const totalLetters = Math.max(6, Math.min(72, alphabetTiles * 6));
  const totalNumbers = Math.max(6, Math.min(72, numberTiles * 6));
  const letters = MAX_ALPHABET_CACHE.slice(0, totalLetters);
  const lastLetter = letters[letters.length - 1];

  return {
    totalLetters,
    totalNumbers,
    letters,
    displayRange: `A–${lastLetter}, 1–${totalNumbers}`,
    summary: `${alphabetTiles} Alphabet Tile${alphabetTiles > 1 ? 's' : ''} × ${numberTiles} Number Tile${numberTiles > 1 ? 's' : ''}`
  };
}

export function pickRandomCoordinate(alphabetTiles, numberTiles) {
  const { totalLetters, totalNumbers, letters } = calculateGridBounds(alphabetTiles, numberTiles);
  const letterIndex = Math.floor(Math.random() * totalLetters);
  const letter = letters[letterIndex];
  const number = Math.floor(Math.random() * totalNumbers) + 1;
  return {
    letter,
    number,
    code: `${letter}-${number}`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  };
}