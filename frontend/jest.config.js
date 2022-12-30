/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
const { compilerOptions } = require('../tsconfig.json');
const { pathsToModuleNameMapper } = require('ts-jest');
/* eslint-enable @typescript-eslint/no-var-requires */
/* eslint-enable @typescript-eslint/no-require-imports */

const paths = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
});

module.exports = {
    transform: {
        '^.+\\.[t]sx?$': '<rootDir>/jest-preprocess.ts'
    },
    moduleNameMapper: {
        '.+\\.(css|styl|less|sass|scss)$'                                                      : 'identity-obj-proxy',
        '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file-mock.ts',
        ...paths
    },
    testPathIgnorePatterns : ['node_modules', '\\.cache', '<rootDir>.*/public'],
    transformIgnorePatterns: ['node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)'],
    globals                : {
        __PATH_PREFIX__: ''
    },
    setupFiles: ['<rootDir>/loadershim.ts']
};