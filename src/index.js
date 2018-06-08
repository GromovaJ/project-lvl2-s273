import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsers';
import getRender from './render';

const typeActions = [
  {
    type: 'withChildren',
    check: (arg1, arg2) => !(arg1 instanceof Array && arg2 instanceof Array) &&
    (arg1 instanceof Object && arg2 instanceof Object),
    process: (arg1, arg2, func) => ({ children: func(arg1, arg2) }),
  },
  {
    type: 'deleted',
    check: (arg1, arg2) => (arg1 && !arg2),
    process: arg1 => ({ value: arg1 }),
  },
  {
    type: 'added',
    check: (arg1, arg2) => (!arg1 && arg2),
    process: (arg1, arg2) => ({ value: arg2 }),
  },
  {
    type: 'changed',
    check: (arg1, arg2) => !(arg1 instanceof Object && arg2 instanceof Object) &&
    (arg1 !== arg2),
    process: (arg1, arg2) => ({ value: { valueBefore: arg1, valueAfter: arg2 } }),
  },
  {
    type: 'notChanged',
    check: (arg1, arg2) => arg1 === arg2,
    process: arg1 => ({ value: arg1 }),
  },
];

const getTypeAction = (argObj1, argObj2) =>
  _.find(typeActions, ({ check }) => check(argObj1, argObj2));

const getAst = (objBefore, objAfter) => {
  const keys = _.union(_.keys(objBefore), _.keys(objAfter));
  const resultAst = keys.map((key) => {
    const valBefore = objBefore[key];
    const valAfter = objAfter[key];
    const { type, process } = getTypeAction(valBefore, valAfter);
    return { type, name: key, ...process(valBefore, valAfter, getAst) };
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
