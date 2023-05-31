import { isMatchValid, Match, ValidMatchCandidate } from './validators/isMatchValid.validator'
import { isSportValid } from './validators/isSportValid.validator'
import { getMatchTeamsSeparator } from './helpers/getMatchTeamsSeparator.helper'

class EventParser {
  isMatchValid(match: ValidMatchCandidate): boolean {
    return isMatchValid(match);
  }

  makeMatchName(match: ValidMatchCandidate): string | Error {
    const isMatchAndSportValid = isMatchValid(match) && isSportValid(match.sport);

    if (isMatchAndSportValid) {
      return `${match.participant1} ${getMatchTeamsSeparator(match as Match)} ${match.participant2}`;
    }

    return 'Exception: invalid sport';
  }
}
