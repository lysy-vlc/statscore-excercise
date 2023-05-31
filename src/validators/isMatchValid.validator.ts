const MATCH_REQUIRED_PROPERTIES: string[] = [
  'sport',
  'participant1',
  'participant2',
  'score'
]

export interface Match {
  sport: string;
  participant1: string;
  participant2: string;
  score: string;
}

export interface ValidMatchCandidate {
  sport?: string;
  participant1?: string;
  participant2?: string;
  score?: string | string[] | string[][];
}

export function isMatchValid(match: ValidMatchCandidate): boolean {
  const currentMatchProperties = Object.keys(match);

  const matchingResults = MATCH_REQUIRED_PROPERTIES.every(property => currentMatchProperties.includes(property))

  return matchingResults
}
