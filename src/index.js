import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsers';
import getRender from './render';

const typeActions = [
  {
    type: 'withChildren',
    check: (obj1, obj2, key) => !(obj1[key] instanceof Array && obj2[key] instanceof Array) &&
    (obj1[key] instanceof Object && obj2[key] instanceof Object),
    process: (obj1, obj2, key, func) => ({ children: func(obj1[key], obj2[key]) }),
  },
  {
    type: 'deleted',
    check: (obj1, obj2, key) => !_.has(obj2, key),
    process: (obj1, obj2, key) => ({ value: obj1[key] }),
  },
  {
    type: 'added',
    check: (obj1, obj2, key) => !_.has(obj1, key),
    process: (obj1, obj2, key) => ({ value: obj2[key] }),
  },
  {
    type: 'changed',
    check: (obj1, obj2, key) => (obj1[key] !== obj2[key]),
    process: (obj1, obj2, key) => ({ valueBefore: obj1[key], valueAfter: obj2[key] }),
  },
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    process: (obj1, obj2, key) => ({ value: obj1[key] }),
  },
];

const getTypeAction = (obj1, obj2, key) =>
  _.find(typeActions, ({ check }) => check(obj1, obj2, key));

const getAst = (objBefore, objAfter) => {
  const keys = _.union(_.keys(objBefore), _.keys(objAfter));
  const resultAst = keys.map((key) => {
    const { type, process } = getTypeAction(objBefore, objAfter, key);
    return { type, name: key, ...process(objBefore, objAfter, key, getAst) };
  });
  return resultAst;
};

const genDiff = (firstFile, secondFile) => {
  const getFileContent = filePath => fs.readFileSync(filePath, 'utf-8');
  const format = path.extname(firstFile).slice(1);
  const parse = getParser(format);
  const firstObj = parse(getFileContent(firstFile));
  const secondObj = parse(getFileContent(secondFile));
  const ast = getAst(firstObj, secondObj);
  const result = `{\n${getRender(ast)}\n}\n`;
  return result;
};
export default genDiff;
