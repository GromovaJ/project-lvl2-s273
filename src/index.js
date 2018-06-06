import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsers';

const actionProperties = [
  {
    check: (obj1, obj2, key) => !_.has(obj1, key),
    process: (obj1, obj2, key) => `  + ${key}: ${obj2[key]}`,
  },
  {
    check: (obj1, obj2, key) => !_.has(obj2, key),
    process: (obj1, obj2, key) => `  - ${key}: ${obj1[key]}`,
  },
  {
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    process: (obj1, obj2, key) => `    ${key}: ${obj2[key]}`,
  },
  {
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    process: (obj1, obj2, key) => [`  + ${key}: ${obj2[key]}`, `  - ${key}: ${obj1[key]}`],
  },
];

const genDiff = (firstFile, secondFile) => {
  const getFileContent = filePath => fs.readFileSync(filePath, 'utf-8');
  const format = path.extname(firstFile).slice(1);
  const pars = getParser(format);
  const firstObj = pars(getFileContent(firstFile));
  const secondObj = pars(getFileContent(secondFile));
  const firstObjkeys = _.keys(firstObj);
  const secondObjkeys = _.keys(secondObj);
  const keys = _.union(firstObjkeys, secondObjkeys);
  const results = keys.map((key) => {
    const { process } = _.find(actionProperties, ({ check }) => check(firstObj, secondObj, key));
    return process(firstObj, secondObj, key);
  });
  return `{\n${_.flatten(results).join('\n')}\n}\n`;
};
export default genDiff;
