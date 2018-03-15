declare var require: any;

export const environment = {
  production: true,
  test: false,
  version: require('../../package.json').version
};
