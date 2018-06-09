import { safeLoad } from 'js-yaml';
import ini from 'ini';

const parsers = {
  json: JSON.parse,
  yaml: safeLoad,
  ini: ini.parse,
};

export default extension => (data) => {
  const parse = parsers[extension];
  if (!parse) {
    throw new Error(`unkown format: ${extension}`);
  }
  return parse(data);
};
