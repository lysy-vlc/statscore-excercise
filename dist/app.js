"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isMatchValid_validator_1 = require("./validators/isMatchValid.validator");
const matches_db_1 = require("./db/matches.db");
const isSportValid_validator_1 = require("./validators/isSportValid.validator");
const getMatchTeamsSeparator_helper_1 = require("./helpers/getMatchTeamsSeparator.helper");
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
}
const parser = new EventParser();
matches_db_1.matches.forEach(m => {
    console.log(parser.makeMatchName(m));
});
//# sourceMappingURL=app.js.map