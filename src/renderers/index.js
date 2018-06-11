import renderDiffText from './textRenderer';
import renderDiffPlain from './plainRenderer';
import renderDiffJson from './jsonRenderer';

const renderers = {
  text: renderDiffText,
  plain: renderDiffPlain,
  json: renderDiffJson,
};

export default format => (data) => {
  const render = renderers[format];
  if (!render) {
    throw new Error(`unkown format ${format}`);
  }
  return render(data);
};
