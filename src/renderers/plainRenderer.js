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

const getValue = (value, type) => {
  const { process } = _.find(propertyActions, ({ check }) => check(value, type));
  return process(value);
};

const getPartString = path => `Property '${path.join('.')}' was`;

const outputStrings = {
  withChildren: (node, path, func) => func(node.children, path),
  deleted: (node, path) => `${getPartString(path)} removed`,
  added: (node, path) => `${getPartString(path)} added with ${
    getValue(node.value)}`,
  changed: (node, path) => `${getPartString(path)} updated. From ${
    getValue(node.valueBefore, node.type)} to ${
    getValue(node.valueAfter, node.type)}`,
};

const getPlainRenderer = (ast, path = []) => {
  const result = ast.filter(node => node.type !== 'unchanged').map((node) => {
    const fullPath = [...path, node.key];
    const getOutputStr = outputStrings[node.type];
    const rendererStr = getOutputStr(node, fullPath, getPlainRenderer);
    return rendererStr;
  });
  return _.flatten(result).join('\n');
};
export default getPlainRenderer;
