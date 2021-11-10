// Beautify string by replacing all the underscores, making uppercase the first letter of each word, and adding space between joined words (i.e. PrivateSafaris to Private Safaris)
export const beautifyString = (str: string) =>
  str
    .replace(/([a-zA-Z])([A-Z])([a-z])/g, '$1 $2$3')
    .replaceAll('_', ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substr(1))
    .join(' ')
