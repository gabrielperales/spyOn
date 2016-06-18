module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'lib/spyon.js',
      'test/*.js',
    ]
  })
}
