const ts = require('typescript');
const {
  Translator,
} = require('swagger-typescript-api/src/translators/translator');

class CustomTranslator extends Translator {
  translate = async (input) => {
    if (input.fileName === 'http-client') {
      return [];
    }

    const isService = input.fileName[0] === input.fileName[0].toUpperCase();

    if (!isService) {
      return [
        {
          fileName: input.fileName,
          fileExtension: ts.Extension.Ts,
          fileContent: await this.codeFormatter.formatCode(input.fileContent),
        },
      ];
    }

    const fileName =
      input.fileName[0].toLowerCase() + input.fileName.substring(1) + '.api';

    return [
      {
        fileName,
        fileExtension: ts.Extension.Ts,
        fileContent: await this.codeFormatter.formatCode(input.fileContent),
      },
    ];
  };
}

module.exports = {
  CustomTranslator,
};
