const VALID_SPORTS: string[] = [
  'soccer',
  'tennis',
  'volleyball',
  'handball',
  'basketball',
  'ski jumping'
];

export function isSportValid(sport: string): boolean {
  return VALID_SPORTS.includes(sport);
}
