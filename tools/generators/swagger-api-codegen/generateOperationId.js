const _ = require('lodash');

const ACTION_METHODS = ['post', 'put', 'patch'];

const generateOperationId = (routeInfo) => {
  const { method, route, moduleName, pathArgs } = routeInfo;

  const usageRoutePart =
    _.split(route, moduleName)[1] || _.split(route, _.kebabCase(moduleName))[1];
  const parts = _.split(route, '/');
  const lastPart = _.last(parts);

  const firstPathArg = pathArgs[0];

  if (!usageRoutePart) {
    return _.camelCase(`${method}_${moduleName}`);
  }

  return _.camelCase(
    _.compact([
      ACTION_METHODS.includes(method) ? '' : method,
      lastPart,
      ...(firstPathArg && firstPathArg.name !== lastPart
        ? ['by', firstPathArg.name]
        : []),
    ]).join('_'),
  );
};

module.exports = generateOperationId;
