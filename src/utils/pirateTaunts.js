export const PIRATE_TAUNTS = [
  "It's Davy Jones for you, scallywag!",
  "Broadside through the hull! Dance with the fishes!",
  "Ye'll be sleepin' with the barnacles tonight!",
  "Blow me down! Sent 'em straight to the briny deep!",
  "No quarter for landlubbers! Down she goes!",
  "Shiver me timbers, that shot split their keel!",
  "Feed 'em to the sharks! Victory is ours!",
  "Strike your colors or sink to the abyss, matey!",
  "Cannonballs and sulfur! Splintered to toothpicks!",
  "A fine broadside! Ye couldn't dodge a kraken at anchor!"
];

export function getRandomPirateTaunt() {
  return PIRATE_TAUNTS[Math.floor(Math.random() * PIRATE_TAUNTS.length)];
}
