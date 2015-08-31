(function () {

  'use strict'

  angular
    .module('memebook.constants')
    .constant('MEME_SERVICE', {
      URL: 'https://ronreiter-meme-generator.p.mashape.com',
      HEADERS: {
        KEY: 'X-Mashape-Key',
        VALUE: 'vqI0P9nvSamshfVxIlNyE6n3GOglp15KcRojsnh4KMsDF1kyzO'
      }
    });

})();