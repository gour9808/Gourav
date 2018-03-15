declare var require: any;
export const environment = {
    production: false,
    test: true,
    version: require('../../package.json').version
};
