import fs from 'fs';
import genDiff from '../src/';

describe('Test', () => {
  it('jsonDiff', () => {
    const filePathBefore = '__tests__/__fixtures__/before.json';
    const filePathAfter = '__tests__/__fixtures__/after.json';
    const filePathDiff = '__tests__/__fixtures__/diff';
    const expected = fs.readFileSync(filePathDiff, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter);
    expect(actual).toBe(expected);
  });
  it('yamlDiff', () => {
    const filePathBefore = '__tests__/__fixtures__/before.yaml';
    const filePathAfter = '__tests__/__fixtures__/after.yaml';
    const filePathDiff = '__tests__/__fixtures__/diff';
    const expected = fs.readFileSync(filePathDiff, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter);
    expect(actual).toBe(expected);
  });
  it('iniDiff', () => {
    const filePathBefore = '__tests__/__fixtures__/before.ini';
    const filePathAfter = '__tests__/__fixtures__/after.ini';
    const filePathDiff = '__tests__/__fixtures__/diff';
    const expected = fs.readFileSync(filePathDiff, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter);
    expect(actual).toBe(expected);
  });
});

describe('Tree Test Json', () => {
  const filePathBefore = '__tests__/__fixtures__/beforeTree.json';
  const filePathAfter = '__tests__/__fixtures__/afterTree.json';
  const filePathDiff = '__tests__/__fixtures__/diffTree';
  const filePathDiffPlain = '__tests__/__fixtures__/diffPlain';
  it('#default format', () => {
    const expected = fs.readFileSync(filePathDiff, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter);
    expect(actual).toBe(expected);
  });
  it('#plain format', () => {
    const expected = fs.readFileSync(filePathDiffPlain, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter, 'plain');
    expect(actual).toBe(expected);
  });
});

describe('Tree Test Yaml', () => {
  const filePathBefore = '__tests__/__fixtures__/beforeTree.yaml';
  const filePathAfter = '__tests__/__fixtures__/afterTree.yaml';
  const filePathDiff = '__tests__/__fixtures__/diffTree';
  const filePathDiffPlain = '__tests__/__fixtures__/diffPlain';
  it('#default format', () => {
    const expected = fs.readFileSync(filePathDiff, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter);
    expect(actual).toBe(expected);
  });
  it('#plain format', () => {
    const expected = fs.readFileSync(filePathDiffPlain, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter, 'plain');
    expect(actual).toBe(expected);
  });
});
