const formatNumber = (num: number): string | null => {
  if (num === null || num === undefined) return null;
  if (num < 1000) return num.toString();

  const units = ['H', 'K', 'M', 'B', 'T', 'Q', 'Qi', 'S', 'Sp', 'O', 'N', 'D'];
  let unitIndex = 0;
  let scaledValue = num;

  // Loop to reduce the number and find the correct unit
  while (scaledValue >= 1000) {
    scaledValue /= 1000;
    unitIndex++;
    // Break the loop if the next division would go beyond the 'B' index
    if (unitIndex === 2 && scaledValue < 1000) {
      break;
    }
  }

  // Ensure we do not exceed the length of the units array
  if (unitIndex >= units.length) {
    unitIndex = units.length - 1; // Set to the last available unit
  }

  return `${scaledValue.toFixed(3)} ${units[unitIndex]}`;
};

const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export { formatAddress, formatNumber };
