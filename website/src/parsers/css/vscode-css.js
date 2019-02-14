import React from 'react';
import defaultParserInterface from './utils/defaultCSSParserInterface';
import pkg from 'vscode-css-languageservice/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

import { getCSSLanguageService } from 'vscode-css-languageservice'

const ID = 'vscode-css';

export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['offset', 'end', 'length']),

  loadParser(callback) {
    callback(getCSSLanguageService());
  },

  parse(cssLS, code) {
    return cssLS.parseStylesheet({
      getText () {
        return code
      },
    })
  },

  nodeToRange(node) {
    if (node.offset && node.end) {
      return [node.offset, node.end];
    }
  },

  getNodeName(node) {
    return node.type
  },

  opensByDefault(node, key) {
    return key === 'children';
  },

  _ignoredProperties: new Set(['parent', 'issues', 'declarations', 'identifier', 'property', 'value']),

  renderSettings(parserSettings, onChange) {
    return (
      <SettingsRenderer
        parserSettings={{...parserSettings}}
        onChange={onChange}
      />
    );
  },
};
