require('dotenv').config();

const path = require('path');
const { generateApi } = require('swagger-typescript-api');
const generateOperationId = require('./generateOperationId');
const customTranslator = require('./custom-translator').CustomTranslator;
const argv = require('minimist')(process.argv.slice(2));

await generateApi({
  input: path.resolve(__dirname, '../../../', argv.p),
  output: path.resolve(__dirname, '../../../', argv.o),
  templates: path.resolve(__dirname, './templates'),
  httpClientType: 'axios',
  customTranslator: customTranslator,
  prettier: {
    proseWrap: 'always',
    singleQuote: true,
    printWidth: 80,
  },
  modular: true,
  extractRequestBody: true,
  extractRequestParams: true,
  extractResponseBody: true,
  extractResponseError: true,
  generateResponses: true,
  cleanOutput: true,
  sortTypes: true,
  extractingOptions: {
    requestParamsSuffix: ['Query'],
  },
  primitiveTypeConstructs: (_) => ({
    string: {
      'date-time': 'Date',
    },
  }),
  hooks: {
    onFormatRouteName: (routeInfo, templateRouteName) => {
      if (!routeInfo.operationId) {
        return generateOperationId(routeInfo);
      }

      return templateRouteName;
    },
    onPrepareConfig: (currentConfiguration) => ({
      ...currentConfiguration,
      apiConfig: {
        ...currentConfiguration.apiConfig,
        baseUrl: 'http://localhost:5000',
      },
    }),
  },
});
