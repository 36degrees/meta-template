'use strict';

const factory = (formatters) => {
  const formats = Object.assign(
    {},
    formatters
  );

  const formatNode = function(node, parent) {
    var format = formats[node.type];
    switch (typeof format) {
      case 'function':
        return format.call(formats, node, parent);
      default:
        throw new Error('Unsupported node type found: "' + node.type + '"');
    }
  };

  formats.node = formatNode;

  formats.extend = function(overrides) {
    return factory(Object.assign(
      {},
      formatters,
      overrides
    ));
  };

  return formatNode;
};

module.exports = factory;
