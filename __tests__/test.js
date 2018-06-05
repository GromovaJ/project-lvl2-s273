import fs from 'fs';
import assert from 'assert';
import genDiff from '../src/';

describe('test', () => {
  it('jsonDiff', () => {
    const filePathBefore = './__tests__/__fixtures__/before.json';
    const filePathAfter = './__tests__/__fixtures__/after.json';
    const filePathDiff = './__tests__/__fixtures__/diff';
    const expected = fs.readFileSync(filePathDiff, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter, 'utf8');
    assert.equal(actual, expected);
  });
});
