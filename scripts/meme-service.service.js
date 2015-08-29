angular.module('myapp').service('memeService', [
  '$resource',
  'bufferArrayToBase64',
  function ($resource, bufferArrayToBase64) {
    var IMAGE_PREFIX = "data:image/png;base64,";
    return $resource('https://ronreiter-meme-generator.p.mashape.com/meme',{},{
      get: {
        method: 'GET',
        contentType: 'image/jpeg',
        responseType: 'arraybuffer',
        transformResponse: function(data, headersGetter) {
          var image = IMAGE_PREFIX + bufferArrayToBase64.convert(data);
          return {image: image};
        },
        headers: {
          'X-Mashape-Key':' vqI0P9nvSamshfVxIlNyE6n3GOglp15KcRojsnh4KMsDF1kyzO'
        }
      },
    });
  }
]);