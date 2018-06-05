import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsers';

const getFileContent = (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`file is not exist: ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf-8');
};

const valueSettings = [
  {
    check: (obj1, obj2, key) => !_.has(obj1, key),
    setValue: (obj1, obj2, key) => `  + ${key}: ${obj2[key]}`,
  },
  {
    check: (obj1, obj2, key) => !_.has(obj2, key),
    setValue: (obj1, obj2, key) => `  - ${key}: ${obj1[key]}`,
  },
  {
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    setValue: (obj1, obj2, key) => `    ${key}: ${obj2[key]}`,
  },
  {
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    setValue: (obj1, obj2, key) => [`  + ${key}: ${obj2[key]}`, `  - ${key}: ${obj1[key]}`],
  },
];

const genDiff = (firstFile, secondFile) => {
  const format = path.extname(firstFile).slice(1);
  const parse = getParser(format);
  const firstObj = parse(getFileContent(firstFile));
  const secondObj = parse(getFileContent(secondFile));
  const firstObjkeys = _.keys(firstObj);
  const secondObjkeys = _.keys(secondObj);
  const keys = _.union(firstObjkeys, secondObjkeys);
  const results = keys.map((key) => {
    const { setValue } = _.find(valueSettings, ({ check }) => check(firstObj, secondObj, key));
    return setValue(firstObj, secondObj, key);
  });
  return `{\n${_.flatten(results).join('\n')}\n}\n`;
};
export default genDiff;
