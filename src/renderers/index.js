import getGeneralRenderer from './generalRenderer';
import getPlainRenderer from './plainRenderer';
import getJsonRenderer from './jsonRenderer';

const renderers = {
  default: getGeneralRenderer,
  plain: getPlainRenderer,
  json: getJsonRenderer,
};

export default format => (data) => {
  const render = renderers[format];
  if (!render) {
    throw new Error('unkown format');
  }
  return render(data);
};
