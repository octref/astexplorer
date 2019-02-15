import React from 'react';
import defaultParserInterface from './utils/defaultCSSParserInterface';
import pkg from 'vscode-css-languageservice/package.json';
import SettingsRenderer from '../utils/SettingsRenderer';

import { getCSSLanguageService } from 'vscode-css-languageservice'

const ID = 'vscode-css';

const NodeType = [
	'Undefined',
	'Identifier',
	'Stylesheet',
	'Ruleset',
	'Selector',
	'SimpleSelector',
	'SelectorInterpolation',
	'SelectorCombinator',
	'SelectorCombinatorParent',
	'SelectorCombinatorSibling',
	'SelectorCombinatorAllSiblings',
	'SelectorCombinatorShadowPiercingDescendant',
	'Page',
	'PageBoxMarginBox',
	'ClassSelector',
	'IdentifierSelector',
	'ElementNameSelector',
	'PseudoSelector',
	'AttributeSelector',
	'Declaration',
	'Declarations',
	'Property',
	'Expression',
	'BinaryExpression',
	'Term',
	'Operator',
	'Value',
	'StringLiteral',
	'URILiteral',
	'EscapedValue',
	'Function',
	'NumericValue',
	'HexColorValue',
	'MixinDeclaration',
	'MixinReference',
	'VariableName',
	'VariableDeclaration',
	'Prio',
	'Interpolation',
	'NestedProperties',
	'ExtendsReference',
	'SelectorPlaceholder',
	'Debug',
	'If',
	'Else',
	'For',
	'Each',
	'While',
	'MixinContent',
	'Media',
	'Keyframe',
	'FontFace',
	'Import',
	'Namespace',
	'Invocation',
	'FunctionDeclaration',
	'ReturnStatement',
	'MediaQuery',
	'FunctionParameter',
	'FunctionArgument',
	'KeyframeSelector',
	'ViewPort',
	'Document',
	'AtApplyRule',
	'CustomPropertyDeclaration',
	'CustomPropertySet',
	'ListEntry',
	'Supports',
	'SupportsCondition',
	'NamespacePrefix',
	'GridLine',
	'Plugin',
	'UnknownAtRule'
]

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
  
  opensByDefault(node) {
    return true;
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
    return NodeType[node.type]
  },

  _ignoredProperties: new Set(['parent', 'issues', 'declarations', 'identifier', 'property', 'value', 'offset', 'end', 'length']),

  renderSettings(parserSettings, onChange) {
    return (
      <SettingsRenderer
        parserSettings={{...parserSettings}}
        onChange={onChange}
      />
    );
  },
};
