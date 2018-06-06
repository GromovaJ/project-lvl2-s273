import fs from 'fs';
import genDiff from '../src/';

describe('Json Test', () => {
  it('jsonDiff', () => {
    const filePathBefore = '__tests__/__fixtures__/before.json';
    const filePathAfter = '__tests__/__fixtures__/after.json';
    const filePathDiff = '__tests__/__fixtures__/diff';
    const expected = fs.readFileSync(filePathDiff, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter);
    expect(actual).toBe(expected);
  });
});
describe('Yaml Test', () => {
  it('yamlDiff', () => {
    const filePathBefore = '__tests__/__fixtures__/before.yaml';
    const filePathAfter = '__tests__/__fixtures__/after.yaml';
    const filePathDiff = '__tests__/__fixtures__/diff';
    const expected = fs.readFileSync(filePathDiff, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter);
    expect(actual).toBe(expected);
  });
});
describe('Ini Test', () => {
  it('iniDiff', () => {
    const filePathBefore = '__tests__/__fixtures__/before.ini';
    const filePathAfter = '__tests__/__fixtures__/after.ini';
    const filePathDiff = '__tests__/__fixtures__/diff';
    const expected = fs.readFileSync(filePathDiff, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter);
    expect(actual).toBe(expected);
  });
});
