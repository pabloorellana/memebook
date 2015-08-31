angular.module('myapp').service('memeService', [
  '$resource',
  'MEME_SERVICE',
  'bufferArrayToBase64',
  function ($resource, MEME_SERVICE, bufferArrayToBase64) {
    var IMAGE_PREFIX = "data:image/png;base64,";

    var meme = $resource('https://ronreiter-meme-generator.p.mashape.com/meme',{},{
      get: {
        method: 'GET',
        contentType: 'image/jpeg',
        responseType: 'arraybuffer',
        transformResponse: function(data, headersGetter) {
          var image = IMAGE_PREFIX + bufferArrayToBase64.convert(data);
          return {image: image};
        },
        headers: {
          'X-Mashape-Key': 'vqI0P9nvSamshfVxIlNyE6n3GOglp15KcRojsnh4KMsDF1kyzO'
        }
      },
    });

    var memeList = $resource('https://ronreiter-meme-generator.p.mashape.com/images',{},{
      get: {
        method: 'GET',
        accept: 'text/plain',
        isArray: true,
        headers: {
          'X-Mashape-Key': 'vqI0P9nvSamshfVxIlNyE6n3GOglp15KcRojsnh4KMsDF1kyzO'
        }
      },
    });

    return {
      getMeme: meme.get,
      getMemeList: memeList.get
    }
  }
]);