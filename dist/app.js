"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventParser = void 0;
const isMatchValid_validator_1 = require("./validators/isMatchValid.validator");
const isSportValid_validator_1 = require("./validators/isSportValid.validator");
const getMatchTeamsSeparator_helper_1 = require("./helpers/getMatchTeamsSeparator.helper");
const matches_db_1 = require("./db/matches.db");
const getScoresFromRegexMatches_helper_1 = require("./helpers/getScoresFromRegexMatches.helper");
const getStringScoreFormatFromMatrix_1 = require("./helpers/getStringScoreFormatFromMatrix");
const scoreTypes_helper_1 = require("./helpers/scoreTypes.helper");
class EventParser {
    isMatchValid(match) {
        return (0, isMatchValid_validator_1.isMatchValid)(match);
    }
    makeMatchName(match) {
        const isMatchAndSportValid = (0, isMatchValid_validator_1.isMatchValid)(match) && (0, isSportValid_validator_1.isSportValid)(match.sport);
        if (isMatchAndSportValid) {
            return `${match.participant1} ${(0, getMatchTeamsSeparator_helper_1.getMatchTeamsSeparator)(match)} ${match.participant2}`;
        }
        return 'Exception: invalid sport';
    }
    formatScore(match) {
        if (scoreTypes_helper_1.SCORE_TYPES_MATCHING_SPORTS.regular.includes(match.sport))
            return match.score;
        if (scoreTypes_helper_1.SCORE_TYPES_MATCHING_SPORTS.fromMatrix.includes(match.sport)) {
            return (0, getStringScoreFormatFromMatrix_1.getStringScoreFormatFromMatrix)(match.score);
        }
        if (scoreTypes_helper_1.SCORE_TYPES_MATCHING_SPORTS.fromRegex.includes(match.sport)) {
            const matchedScores = /([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+)/.exec(match.score);
            const scores = (0, getScoresFromRegexMatches_helper_1.getScoresFromRegexMatches)(matchedScores);
            if (scores === 'Exception: wrong scores')
                return scores;
            const [mainScore, ...restOfScores] = scores;
            const restOfScoresFormatted = restOfScores.reduce((scoresString, currentScore, currentScoreIndex) => {
                if (currentScoreIndex === restOfScores.length - 1) {
                    return scoresString + `set${currentScoreIndex + 1} ${currentScore}`;
                }
                return scoresString + `set${currentScoreIndex + 1} ${currentScore}, `;
            }, '');
            return `Main score: ${mainScore} (${restOfScoresFormatted})`;
        }
    }
}
exports.EventParser = EventParser;
function parseMatches(matchesToParse) {
    const parser = new EventParser();
    const parsedMatches = [];
    matchesToParse.forEach(match => {
        if (parser.isMatchValid(match)) {
            parsedMatches.push({
                name: parser.makeMatchName(match),
                score: parser.formatScore(match)
            });
        }
    });
    return parsedMatches;
}
console.log(parseMatches(matches_db_1.matches));
//# sourceMappingURL=app.js.map