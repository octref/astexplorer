import React from 'react';
import defaultParserInterface from '../utils/defaultParserInterface';
import pkg from 'vscode-html-languageservice/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

import { getLanguageService } from 'vscode-html-languageservice';

const ID = 'vscode-html';

const parserSettingsConfiguration = {
  fields : [],
};


export default {
  ...defaultParserInterface,

  id: ID,
  displayName: ID,
  version: pkg.version,
  homepage: pkg.homepage,
  locationProps: new Set(['start', 'end']),

  loadParser(callback) {
    const htmlLS = getLanguageService();
    callback(htmlLS);
  },

  parse(htmlLS, code) {
    const roots = htmlLS.parseHTMLDocument({
      getText () {
        return code
      },
    }).roots;

    return {
      tag: '#root',
      start: 0,
      end: roots.length > 0 ? roots[roots.length - 1].end : 0,
      children: roots,
    }
  },

  getNodeName(node) {
    return node.tag;
  },

  nodeToRange(node) {
    if (node.start && node.end) {
      return [node.start, node.end];
    }
  },

  opensByDefault(node, key) {
    return key === 'children';
  },

  renderSettings(parserSettings, onChange) {
    return (
      <SettingsRenderer
        settingsConfiguration={parserSettingsConfiguration}
        parserSettings={{...parserSettings}}
        onChange={onChange}
      />
    );
  },

  _ignoredProperties: new Set(['endTagStart', 'parent', 'attributes', 'attributeNames', 'closes', 'firstChild', 'lastChild']),
};
