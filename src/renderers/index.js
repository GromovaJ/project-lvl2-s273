import getRenderer from './renderer';
import getPlainRenderer from './plainRenderer';

const renderers = {
  default: getRenderer,
  plain: getPlainRenderer,
};

export default format => (data) => {
  const render = renderers[format];
  if (!render) {
    throw new Error('unkown format');
  }
  return render(data);
};
