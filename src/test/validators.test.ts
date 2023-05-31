import { describe, expect, test } from '@jest/globals';
import { isMatchValid } from '../validators/isMatchValid.validator'
import { matches } from '../db/matches.db'
import { isSportValid } from '../validators/isSportValid.validator'

describe('is match valid validator', () => {
  test('should be valid (true)', () => {
    expect(isMatchValid(matches[0])).toBe(true);
  });

  test('should not be valid (false)', () => {
    expect(isMatchValid(matches[5])).toBe(false);
  });
});

describe('is sport valid validator', () => {
  test('should be valid (true)', () => {
    expect(isSportValid('volleyball')).toBe(true);
  });

  test('should not be valid (false)', () => {
    expect(isSportValid('cycling')).toBe(false);
  });
});
