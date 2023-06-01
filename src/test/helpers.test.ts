import { describe, expect, test } from '@jest/globals';
import { matches } from '../db/matches.db';
import { getMatchTeamsSeparator } from '../helpers/getMatchTeamsSeparator.helper';
import { Match } from '../validators/isMatchValid.validator';
import { getScoresFromRegexMatches } from '../helpers/getScoresFromRegexMatches.helper'
import { getStringScoreFormatFromMatrix } from '../helpers/getStringScoreFormatFromMatrix'

describe('get match team names separator', () => {
  test('should be \"-\"', () => {
    expect(getMatchTeamsSeparator(matches[0] as Match)).toBe('-');
  });

  test('should be \"vs\"', () => {
    expect(getMatchTeamsSeparator(matches[2] as Match)).toBe('vs');
  });
})

describe('get scores from regex matches', () => {
  test('should be \"[ \'2:1\', \'7:6\', \'6:3\' ]\"', () => {
    const scores = /([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+),([0-9]+\:[0-9]+)/.exec(matches[4].score as string);

    expect(getScoresFromRegexMatches(scores)).toEqual([ '2:1', '7:6', '6:3', '6:7' ]);
  });

  test('should be \"Exception: wrong scores\"', () => {
    expect(getScoresFromRegexMatches([ '2:1', '7:6', '6:3' ])).toEqual('Exception: wrong scores');
  });
})

describe('get string score format from matrix', () => {
  test('should be "9:7, 2:1, 5:3, 9:9"', () => {
    expect(getStringScoreFormatFromMatrix(matches[3].score)).toBe('9:7,2:1,5:3,9:9')
  })
})
