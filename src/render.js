import _ from 'lodash';

const actionProperties = [
  {
    check: value => (value instanceof Object && !(value instanceof Array)),
    action: (name, value, level) => {
      const convertObjToString = (obj, lev) => {
        const result = _.keys(obj).map(key => ` ${key}: ${obj[key]}`).join('\n');
        return `\n${' '.repeat(lev + 5)}${result}\n${' '.repeat(lev + 2)}}`;
      };
      return `${name}: {${convertObjToString(value, level)}`;
    },
  },
  {
    check: value => !(value instanceof Object),
    action: (name, value) => `${name}: ${value}`,
  },
];

const stringify = (name, value, level) => {
  const { action } = _.find(actionProperties, ({ check }) => check(value));
  return action(name, value, level);
};

const outputProperties = [
  {
    type: 'withChildren',
    status: ' ',
    getOutputStr: (obj, level, func) => `  ${obj.name}: {\n${
      func(obj.children, level + 4)}\n${' '.repeat(level + 2)}}`,
  },
  {
    type: 'deleted',
    getOutputStr: (obj, level) => `- ${stringify(obj.name, obj.value, level)}`,
  },
  {
    type: 'added',
    getOutputStr: (obj, level) => `+ ${stringify(obj.name, obj.value, level)}`,
  },
  {
    type: 'notChanged',
    getOutputStr: (obj, level) => `  ${stringify(obj.name, obj.value, level)}`,
  },
  {
    type: 'changed',
    getOutputStr: (obj, level) => `+ ${
      stringify(obj.name, obj.value.valueAfter, level)}\n${' '.repeat(level)}- ${
      stringify(obj.name, obj.value.valueBefore, level)}`,
  },
];

const getRender = (ast, level = 2) => {
  const resultString = ast.map((arg) => {
    const { getOutputStr } = _.find(outputProperties, ({ type }) => type === arg.type);
    return ' '.repeat(level) + getOutputStr(arg, level, getRender);
  }).join('\n');
  return resultString;
};

export default getRender;
