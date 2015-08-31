(function () {

  'use strict'

  angular
    .module('memebook.services')
    .service('memeService', [
      '$resource',
      'MEME_SERVICE',
      'bufferArrayToBase64',
      memeService
    ]);

  function memeService ($resource, MEME_SERVICE, bufferArrayToBase64) {

    var IMAGE_PREFIX = "data:image/png;base64,";

    var meme = $resource(MEME_SERVICE.URL + '/meme',{},{
      get: {
        method: 'GET',
        contentType: 'image/jpeg',
        responseType: 'arraybuffer',
        transformResponse: function(data, headersGetter) {
          var image = IMAGE_PREFIX + bufferArrayToBase64.convert(data);
          return {
            image: image
          };
        },
        headers: {
          'X-Mashape-Key': MEME_SERVICE.HEADERS.VALUE
        }
      },
    });

    var memeList = $resource(MEME_SERVICE.URL + '/images',{},{
      get: {
        method: 'GET',
        accept: 'text/plain',
        isArray: true,
        headers: {
          'X-Mashape-Key': MEME_SERVICE.HEADERS.VALUE
        }
      },
    });

    return {
      getMeme: meme.get,
      getMemeList: memeList.get
    }
  }
})();