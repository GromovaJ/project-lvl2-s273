import _ from 'lodash';

const actionProperties = [
  {
    check: value => (value instanceof Object && !(value instanceof Array)),
    action: (key, value, level) => {
      const convertObjToString = (obj, lev) => {
        const result = _.keys(obj).map(keyObj => ` ${keyObj}: ${obj[keyObj]}`);
        return `\n${' '.repeat(lev + 5)}${result}\n${' '.repeat(lev + 2)}}`;
      };
      return `{${convertObjToString(value, level)}`;
    },
  },
  {
    check: value => !(value instanceof Object),
    action: (key, value) => `${value}`,
  },
];

const stringify = (key, value, level, sign) => {
  const { action } = _.find(actionProperties, ({ check }) => check(value));
  return `${' '.repeat(level)}${sign}${key}: ${action(key, value, level)}`;
};

const outputStrings = {
  withChildren: (obj, level, func) => `  ${' '.repeat(level)}${
    obj.key}: {\n${func(obj.children, level + 4)}\n${' '.repeat(level + 2)}}`,
  deleted: (obj, level) => `${stringify(obj.key, obj.value, level, '- ')}`,
  added: (obj, level) => `${stringify(obj.key, obj.value, level, '+ ')}`,
  unchanged: (obj, level) => `${stringify(obj.key, obj.value, level, '  ')}`,
  changed: (obj, level) => [`${stringify(obj.key, obj.valueAfter, level, '+ ')}`, `${
    stringify(obj.key, obj.valueBefore, level, '- ')}`],
};

const getRenderer = (ast, level = 2) => {
  const resultString = ast.map((node) => {
    const getOutputStr = outputStrings[node.type];
    return getOutputStr(node, level, getRenderer);
  });
  return _.flatten(resultString).join('\n');
};
const getGeneralRenderer = (ast, level = 2) => {
  const result = getRenderer(ast, level);
  return `{\n${result}\n}\n`;
};
export default getGeneralRenderer;
