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

const outputStrings = {
  withChildren: (obj, level, func) => `  ${obj.name}: {\n${func(obj.children, level + 4)}\n${' '.repeat(level + 2)}}`,
  deleted: (obj, level) => `- ${stringify(obj.name, obj.value, level)}`,
  added: (obj, level) => `+ ${stringify(obj.name, obj.value, level)}`,
  unchanged: (obj, level) => `  ${stringify(obj.name, obj.value, level)}`,
  changed: (obj, level) => `+ ${
    stringify(obj.name, obj.valueAfter, level)}\n${' '.repeat(level)}- ${
    stringify(obj.name, obj.valueBefore, level)}`,
};

const getRenderer = (ast, level = 2) => {
  const resultString = ast.map((node) => {
    const getOutputStr = outputStrings[node.type];
    return ' '.repeat(level) + getOutputStr(node, level, getRenderer);
  }).join('\n');
  return resultString;
};

export default getRenderer;
