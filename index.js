/**
 * @fileoverview Enforce no use "is" notation in props
 * @author Oleg Sidorovich
 */

"use strict";

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const messages = {
  noIsNotation: "No use 'isDisabled' in props, use disabled",
};

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow use 'isDisabled' props in JSX",
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
        const configuration = context.options[0] || {};
        const ignoreCase = configuration.ignoreCase || false;

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
  },
};
