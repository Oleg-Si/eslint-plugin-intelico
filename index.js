/**
 * @fileoverview Enforce no use "is/has" notation in props
 * @author Oleg Sidorovich
 */

"use strict";

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const messages = {
  noIsNotation: "No use 'isDisabled' in props, use disabled",
  noHasNotation: "No use 'hasElement' in props, use element",
};

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow use 'is/has' props in JSX",
      recommended: true,
    },

    messages,

    schema: [
      {
        type: "object",
        properties: {
          ignoreCase: {
            type: "boolean",
          },
        },
        additionalProperties: false,
      },
    ],
  },

  rules: {
    "not-is-props-notation": {
      create(context) {
        return {
          JSXOpeningElement(node) {
            node.attributes.forEach((decl) => {
              if (decl.type === "JSXSpreadAttribute") {
                return;
              }

              let name = decl.name.name;

              if (typeof name !== "string") {
                return;
              }

              if (name && new RegExp(`is[A-Z]`).test(name)) {
                context.report(decl, messages.noIsNotation);
              }
            });
          },
        };
      },
    },

    "not-has-props-notation": {
      create(context) {
        return {
          JSXOpeningElement(node) {
            node.attributes.forEach((decl) => {
              if (decl.type === "JSXSpreadAttribute") {
                return;
              }

              let name = decl.name.name;

              if (typeof name !== "string") {
                return;
              }

              if (name && new RegExp(`has[A-Z]`).test(name)) {
                context.report(decl, messages.noHasNotation);
              }
            });
          },
        };
      },
    },
  },
};
