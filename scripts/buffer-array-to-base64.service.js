(function() {

  angular
    .module('myapp')
    .service('bufferArrayToBase64', bufferArrayToBase64);

  function bufferArrayToBase64() {

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

})();
