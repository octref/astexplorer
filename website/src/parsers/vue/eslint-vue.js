import pkg from 'vue-eslint-parser/package.json';

import defaultParserInterface from '../utils/defaultParserInterface';

export default {
  ...defaultParserInterface,

  id: 'vue',
  displayName: 'Vue',
  version: pkg.version,
  homepage: pkg.homepage,

  locationProps: new Set(['loc', 'range']),

  loadParser(callback) {
    require(['vue-eslint-parser'], (vep) => callback(vep.parse))
  },

  opensByDefault(node) {
    return true;
  },

  parse(parseVue, code) {
    return parseVue(code).templateBody;
  },

  nodeToRange({ range }) {
    if (!range) return;
    return range;
  },
  
  getNodeName(node) {
    return node.type
  },

  _ignoredProperties: new Set(['loc', 'start', 'end', 'range', 'parent', 'rawName', 'namespace', 'type', 'tokens', 'comments', 'errors']),
};
