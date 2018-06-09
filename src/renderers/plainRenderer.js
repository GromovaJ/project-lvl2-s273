import _ from 'lodash';

const propertyActions = [
  {
    check: value => value instanceof Object,
    process: () => 'complex value',
  },
  {
    check: (value, type) => !(value instanceof Object) && type === 'changed',
    process: value => `'${value}'`,
  },
  {
    check: value => !(value instanceof Object),
    process: value => `value: '${value}'`,
  },
];

const getOutputValue = (value, type) => {
  const { process } = _.find(propertyActions, ({ check }) => check(value, type));
  return process(value);
};
const outputStrings = {
  withChildren: (node, path, func) => func(node.children, path),
  deleted: (node, path) => `Property '${path}' was removed`,
  added: (node, path) => `Property '${path}' was added with ${
    getOutputValue(node.value)}`,
  changed: (node, path) => `Property '${path}' was updated. From ${
    getOutputValue(node.valueBefore, node.type)} to ${
    getOutputValue(node.valueAfter, node.type)}`,
};

const getPlainRenderer = (ast, path = []) => {
  const result = ast.filter(node => node.type !== 'unchanged').map((node) => {
    const fullPath = _.flatten([path, node.name]).join('.');
    const getOutputStr = outputStrings[node.type];
    const rendererStr = getOutputStr(node, fullPath, getPlainRenderer);
    return rendererStr;
  });
  return _.flatten(result).join('\n');
};
export default getPlainRenderer;
