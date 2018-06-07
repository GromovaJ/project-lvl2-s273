import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsers';
import getRender from './render';

const statusActions = [
  {
    status: 'withChildren',
    check: (obj1, obj2, key) => (_.isObject(obj1[key]) && _.isObject(obj2[key])),
    process: (obj1, obj2, key, func) => func(obj1[key], obj2[key]),
  },
  {
    status: 'deleted',
    check: (obj1, obj2, key) => (_.has(obj1, key) && !_.has(obj2, key)),
    process: (obj1, obj2, key) => obj1[key],
  },
  {
    status: 'added',
    check: (obj1, obj2, key) => (!_.has(obj1, key) && _.has(obj2, key)),
    process: (obj1, obj2, key) => obj2[key],
  },
  {
    status: 'changed',
    check: (obj1, obj2, key) => obj1[key] !== obj2[key],
    process: (obj1, obj2, key) => ({
      valueBefore: obj1[key],
      valueAfter: obj2[key],
    }),
  },
  {
    status: 'notChanged',
    check: (obj1, obj2, key) => obj1[key] === obj2[key],
    process: (obj1, obj2, key) => obj1[key],
  },
];

const getStatusAction = (argObj1, argObj2, argKey) =>
  _.find(statusActions, ({ check }) => check(argObj1, argObj2, argKey));

const getAst = (objBefore, objAfter) => {
  const keys = _.union(_.keys(objBefore), _.keys(objAfter));
  const resultAst = keys.map((key) => {
    const { status, process } = getStatusAction(objBefore, objAfter, key);
    return ({ status, name: key, value: process(objBefore, objAfter, key, getAst) });
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
