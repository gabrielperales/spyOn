module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    plugins : ['karma-jasmine', 'karma-phantomjs-launcher'],

    files: [
      'lib/spyon.js',
      'test/*.js',
    ],

    // web server port
    port: 9876
  });
}
