(function () {
  angular.module('myapp')
    .constant('MEME_SERVICE', {
      URL: 'https://ronreiter-meme-generator.p.mashape.com/meme',
      HEADERS: {
        KEY: 'X-Mashape-Key',
        VALUE: 'vqI0P9nvSamshfVxIlNyE6n3GOglp15KcRojsnh4KMsDF1kyzO'
      }
    });
})();