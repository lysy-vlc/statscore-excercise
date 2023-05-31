import { describe, expect, test } from '@jest/globals';
import { matches } from '../db/matches.db';
import { getMatchTeamsSeparator } from '../helpers/getMatchTeamsSeparator.helper';
import { Match } from '../validators/isMatchValid.validator';

describe('get match team names separator', () => {
  test('should be \"-\"', () => {
    expect(getMatchTeamsSeparator(matches[0] as Match)).toBe('-');
  })

  test('should be \"vs\"', () => {
    expect(getMatchTeamsSeparator(matches[2] as Match)).toBe('vs');
  })
})
