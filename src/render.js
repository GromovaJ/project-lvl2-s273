import _ from 'lodash';

const stringActions = [
  {
    check: value => _.isObject(value),
    action: (name, value, level) => {
      const convertObjToString = (obj, lev) => {
        const result = _.keys(obj).map(key => ` ${key}: ${obj[key]}`).join('\n');
        return `\n${' '.repeat(lev + 5)}${result}\n${' '.repeat(lev + 2)}}`;
      };
      return `${name}: {${convertObjToString(value, level)}`;
    },
  },
  {
    check: value => !_.isObject(value),
    action: (name, value) => `${name}: ${value}`,
  },
];


const stringify = (name, value, level) => {
  const { action } = _.find(stringActions, ({ check }) => check(value));
  return action(name, value, level);
};

const outputStrings = {
  withChildren: (name, value, level, func) => `  ${name}: {\n${func(value, level + 4)}\n${' '.repeat(level + 2)}}`,
  added: (name, value, level) => `+ ${stringify(name, value, level)}`,
  deleted: (name, value, level) => `- ${stringify(name, value, level)}`,
  notChanged: (name, value, level) => `  ${stringify(name, value, level)}`,
  changed: (name, value, level) => `+ ${stringify(name, value.valueAfter, level)}\n${
    ' '.repeat(level)}- ${stringify(name, value.valueBefore, level)}`,
};

const getRender = (ast, level = 2) => {
  const resultString = ast.map(({ name, value, status }) => {
    const getOutputString = outputStrings[status];
    return ' '.repeat(level) + getOutputString(name, value, level, getRender);
  }).join('\n');
  return resultString;
};
export default getRender;
