import { Match } from '../validators/isMatchValid.validator'

const SPORTS_WITH_VS_SEPARATOR: string[] = [
  'tennis',
  'handball',
];

const SPORTS_WITH_DASH_SEPARATOR: string[] = [
  'soccer',
  'volleyball',
  'basketball'
]

export function getMatchTeamsSeparator(match: Match): string {
  if (SPORTS_WITH_VS_SEPARATOR.includes(match.sport)) return 'vs';

  if (SPORTS_WITH_DASH_SEPARATOR.includes(match.sport)) return '-';
}
