(function () {

  'use strict'

  angular
    .module('memebook.constants')
    .constant('FIREBASE', {
      DATABASE_URL: 'https://luminous-inferno-5914.firebaseio.com/',
      POSTS: 'posts',
      USERS: 'users',
      COMMENTS: 'comments'
    });

})();