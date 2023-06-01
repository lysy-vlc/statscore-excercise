export function getScoresFromRegexMatches(regexMatches: string[]): string[] | string {
  const regexMatchesCopy = [ ...regexMatches ];
  if (regexMatchesCopy.length <= 4) return 'Exception: wrong scores';

  regexMatchesCopy.shift();

  return regexMatchesCopy.splice(regexMatchesCopy.length - 4, 3);
}
