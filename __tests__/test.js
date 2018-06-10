import fs from 'fs';
import genDiff from '../src/';

describe('Test - files.json', () => {
  const filePathBefore = '__tests__/__fixtures__/before.json';
  const filePathAfter = '__tests__/__fixtures__/after.json';
  it('#default format', () => {
    const filePathDiff = '__tests__/__fixtures__/diff';
    const expected = fs.readFileSync(filePathDiff, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter);
    expect(actual).toBe(expected);
  });
  it('#json format', () => {
    const filePathDiff = '__tests__/__fixtures__/diffJson';
    const expected = fs.readFileSync(filePathDiff, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter, 'json');
    expect(actual).toBe(expected);
  });
});

describe('Test - files.yaml', () => {
  it('#default format', () => {
    const filePathBefore = '__tests__/__fixtures__/before.yaml';
    const filePathAfter = '__tests__/__fixtures__/after.yaml';
    const filePathDiff = '__tests__/__fixtures__/diff';
    const expected = fs.readFileSync(filePathDiff, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter);
    expect(actual).toBe(expected);
  });
});

describe('Test - files.ini', () => {
  it('#default format', () => {
    const filePathBefore = '__tests__/__fixtures__/before.ini';
    const filePathAfter = '__tests__/__fixtures__/after.ini';
    const filePathDiff = '__tests__/__fixtures__/diff';
    const expected = fs.readFileSync(filePathDiff, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter);
    expect(actual).toBe(expected);
  });
});

describe('Test Tree - files.json', () => {
  const filePathBefore = '__tests__/__fixtures__/beforeTree.json';
  const filePathAfter = '__tests__/__fixtures__/afterTree.json';
  it('#default format', () => {
    const filePathDiff = '__tests__/__fixtures__/diffTree';
    const expected = fs.readFileSync(filePathDiff, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter);
    expect(actual).toBe(expected);
  });
  it('#plain format', () => {
    const filePathDiffPlain = '__tests__/__fixtures__/diffTreePlain';
    const expected = fs.readFileSync(filePathDiffPlain, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter, 'plain');
    expect(actual).toBe(expected);
  });
  it('#json format', () => {
    const filePathDiffJson = '__tests__/__fixtures__/diffTreeJson';
    const expected = fs.readFileSync(filePathDiffJson, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter, 'json');
    expect(actual).toBe(expected);
  });
});

describe('Test Tree - files.yaml', () => {
  const filePathBefore = '__tests__/__fixtures__/beforeTree.yaml';
  const filePathAfter = '__tests__/__fixtures__/afterTree.yaml';
  it('#default format', () => {
    const filePathDiff = '__tests__/__fixtures__/diffTree';
    const expected = fs.readFileSync(filePathDiff, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter);
    expect(actual).toBe(expected);
  });
  it('#plain format', () => {
    const filePathDiffPlain = '__tests__/__fixtures__/diffTreePlain';
    const expected = fs.readFileSync(filePathDiffPlain, 'utf8');
    const actual = genDiff(filePathBefore, filePathAfter, 'plain');
    expect(actual).toBe(expected);
  });
});
