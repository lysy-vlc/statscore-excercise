import { isMatchValid, Match, ValidMatchCandidate } from './validators/isMatchValid.validator'
import { isSportValid } from './validators/isSportValid.validator'
import { getMatchTeamsSeparator } from './helpers/getMatchTeamsSeparator.helper'
import { matches } from './db/matches.db'
import { getScoresFromRegexMatches } from './helpers/getScoresFromRegexMatches.helper'
import { getStringScoreFormatFromMatrix } from './helpers/getStringScoreFormatFromMatrix'
import { SCORE_TYPES_MATCHING_SPORTS } from './helpers/scoreTypes.helper'

class EventParser {
  isMatchValid(match: ValidMatchCandidate): boolean {
    return isMatchValid(match);
  }

  makeMatchName(match: ValidMatchCandidate): string {
    const isMatchAndSportValid: boolean = isMatchValid(match) && isSportValid(match.sport);

    if (isMatchAndSportValid) {
      return `${match.participant1} ${getMatchTeamsSeparator(match as Match)} ${match.participant2}`;
    }

    return 'Exception: invalid sport';
  }

  formatScore(match: Match): string {
    if (SCORE_TYPES_MATCHING_SPORTS.regular.includes(match.sport)) return match.score

    if (SCORE_TYPES_MATCHING_SPORTS.fromMatrix.includes(match.sport)) {
      return getStringScoreFormatFromMatrix(match.score)
    }

    if (SCORE_TYPES_MATCHING_SPORTS.fromRegex.includes(match.sport)) {
      const matchedScores = /([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+)/.exec(match.score);

      const scores = getScoresFromRegexMatches(matchedScores);

      if (scores === 'Exception: wrong scores') return scores;

      const [ mainScore, ...restOfScores ] = scores;

      const restOfScoresFormatted = restOfScores.reduce((scoresString, currentScore, currentScoreIndex) => {
        if (currentScoreIndex === restOfScores.length - 1) {
          return scoresString + `set${currentScoreIndex + 1} ${currentScore}`
        }

        return scoresString + `set${currentScoreIndex + 1} ${currentScore}, `
      }, '')

      return `Main score: ${mainScore} (${restOfScoresFormatted})`;
    }
  }
}

function parseMatches(matchesToParse) {
  const parser = new EventParser()

  const parsedMatches = [];

  matchesToParse.forEach(match => {
    if (parser.isMatchValid(match)) {
      parsedMatches.push({
        name: parser.makeMatchName(match),
        score: parser.formatScore(match)
      })
    }
  })

  return parsedMatches
}

console.log(parseMatches(matches))
