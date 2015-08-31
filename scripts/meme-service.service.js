angular.module('myapp').service('memeService', [
  '$resource',
  'MEME_SERVICE',
  'bufferArrayToBase64',
  function ($resource, MEME_SERVICE, bufferArrayToBase64) {
    var IMAGE_PREFIX = "data:image/png;base64,";
    console.log(MEME_SERVICE)
    return $resource(MEME_SERVICE.URL,{},{
      get: {
        method: 'GET',
        contentType: 'image/jpeg',
        responseType: 'arraybuffer',
        transformResponse: function(data, headersGetter) {
          var image = IMAGE_PREFIX + bufferArrayToBase64.convert(data);
          return {image: image};
        },
        headers: {
          //MEME_SERVICE.HEADERS.KEY: MEME_SERVICE.HEADERS.VALUE
        }
      },
    });
  }
]);