import { describe, expect, test } from '@jest/globals'
import { getMatchTeamsSeparator } from '../helpers/getMatchTeamsSeparator.helper'
import { matches } from '../db/matches.db'
import { Match } from '../validators/isMatchValid.validator'
import { EventParser } from '../app'

describe('format scores method', () => {
  const parser = new EventParser()

  test('scores from regex type', () => {
    expect(parser.formatScore(matches[1] as Match)).toBe('Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)');
  });

  test('scores from matrix type', () => {
    expect(parser.formatScore(matches[3] as Match)).toBe('9:7,2:1,5:3,9:9');
  });

  test('scores from regular type', () => {
    expect(parser.formatScore(matches[0] as Match)).toBe('2:1');
  });
})
