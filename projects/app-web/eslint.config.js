import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import rootConfig from '../../eslint.config.cjs';

// TODO(#6): extract plugin configs to centralized location for sharing
export default [
  ...rootConfig,
  {
    settings: {
      react: {
        createClass: 'createReactClass',
        pragma: 'React',
        fragment: 'Fragment',
        version: 'detect',
      },
    },
    files: ['app/**', 'server.mjs'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    languageOptions: {
      globals: {
        console: 'readonly',
      },
    },
    // TODO(#7): ENABLE RULES WHEN FULL ESLINT 9 SUPPORT AVAILABLE
    rules: {
      // 'react/display-name': 'error',
      // 'react/jsx-key': 'error',
      // 'react/jsx-no-comment-textnodes': 'error',
      // 'react/jsx-no-duplicate-props': 'error',
      // 'react/jsx-no-target-blank': 'error',
      // 'react/jsx-no-undef': 'error',
      // 'react/jsx-uses-react': 'error',
      // 'react/jsx-uses-vars': 'error',
      // 'react/no-children-prop': 'error',
      // 'react/no-danger-with-children': 'error',
      // 'react/no-deprecated': 'error',
      // 'react/no-direct-mutation-state': 'error',
      // 'react/no-find-dom-node': 'error',
      // 'react/no-is-mounted': 'error',
      // 'react/no-render-return-value': 'error',
      // 'react/no-string-refs': 'error',
      // 'react/no-unescaped-entities': 'error',
      // 'react/no-unknown-property': 'error',
      // 'react/no-unsafe': 'off',
      // 'react/prop-types': 'error',
      // 'react/react-in-jsx-scope': 'error',
      // 'react/require-render-return': 'error',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-ambiguous-text': 'off',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
      'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
      'jsx-a11y/aria-props': 'error',
      'jsx-a11y/aria-proptypes': 'error',
      'jsx-a11y/aria-role': 'error',
      'jsx-a11y/aria-unsupported-elements': 'error',
      'jsx-a11y/autocomplete-valid': 'error',
      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/control-has-associated-label': [
        'off',
        {
          ignoreElements: [
            'audio',
            'canvas',
            'embed',
            'input',
            'textarea',
            'tr',
            'video',
          ],
          ignoreRoles: [
            'grid',
            'listbox',
            'menu',
            'menubar',
            'radiogroup',
            'row',
            'tablist',
            'toolbar',
            'tree',
            'treegrid',
          ],
          includeRoles: ['alert', 'dialog'],
        },
      ],
      'jsx-a11y/heading-has-content': 'error',
      'jsx-a11y/html-has-lang': 'error',
      'jsx-a11y/iframe-has-title': 'error',
      'jsx-a11y/img-redundant-alt': 'error',
      'jsx-a11y/interactive-supports-focus': [
        'error',
        {
          tabbable: [
            'button',
            'checkbox',
            'link',
            'searchbox',
            'spinbutton',
            'switch',
            'textbox',
          ],
        },
      ],
      'jsx-a11y/label-has-associated-control': 'error',
      'jsx-a11y/label-has-for': 'off',
      'jsx-a11y/media-has-caption': 'error',
      'jsx-a11y/mouse-events-have-key-events': 'error',
      'jsx-a11y/no-access-key': 'error',
      'jsx-a11y/no-autofocus': 'error',
      'jsx-a11y/no-distracting-elements': 'error',
      'jsx-a11y/no-interactive-element-to-noninteractive-role': [
        'error',
        {
          tr: ['none', 'presentation'],
          canvas: ['img'],
        },
      ],
      'jsx-a11y/no-noninteractive-element-interactions': [
        'error',
        {
          handlers: [
            'onClick',
            'onError',
            'onLoad',
            'onMouseDown',
            'onMouseUp',
            'onKeyPress',
            'onKeyDown',
            'onKeyUp',
          ],
          alert: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
          body: ['onError', 'onLoad'],
          dialog: ['onKeyUp', 'onKeyDown', 'onKeyPress'],
          iframe: ['onError', 'onLoad'],
          img: ['onError', 'onLoad'],
        },
      ],
      'jsx-a11y/no-noninteractive-element-to-interactive-role': [
        'error',
        {
          ul: [
            'listbox',
            'menu',
            'menubar',
            'radiogroup',
            'tablist',
            'tree',
            'treegrid',
          ],
          ol: [
            'listbox',
            'menu',
            'menubar',
            'radiogroup',
            'tablist',
            'tree',
            'treegrid',
          ],
          li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
          table: ['grid'],
          td: ['gridcell'],
          fieldset: ['radiogroup', 'presentation'],
        },
      ],
      'jsx-a11y/no-noninteractive-tabindex': [
        'error',
        {
          tags: [],
          roles: ['tabpanel'],
          allowExpressionValues: true,
        },
      ],
      'jsx-a11y/no-redundant-roles': 'error',
      'jsx-a11y/no-static-element-interactions': [
        'error',
        {
          allowExpressionValues: true,
          handlers: [
            'onClick',
            'onMouseDown',
            'onMouseUp',
            'onKeyPress',
            'onKeyDown',
            'onKeyUp',
          ],
        },
      ],
      'jsx-a11y/role-has-required-aria-props': 'error',
      'jsx-a11y/role-supports-aria-props': 'error',
      'jsx-a11y/scope': 'error',
      'jsx-a11y/tabindex-no-positive': 'error',
    },
  },
  // {
  //   ignores: ['!**/*'],
  //   overrides: [
  //     {
  //       files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
  //       rules: {},
  //     },
  //     {
  //       files: ['*.ts', '*.tsx'],
  //       rules: {},
  //     },
  //     {
  //       files: ['*.js', '*.jsx'],
  //       rules: {},
  //     },
  //   ],
  // },
];
