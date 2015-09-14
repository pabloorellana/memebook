(function() {

  'use strict';

  angular
    .module('memebook.services')
    .service('bufferArrayToBase64', [
      function() {

        function convert(buffer) {

          var binary = '';
          var bytes = new Uint8Array(buffer);
          var len = bytes.byteLength;

          for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
          }

          return window.btoa(binary);
        }

        this.convert = convert;
      }
    ]);
})();
