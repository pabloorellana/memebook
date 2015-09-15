(function () {

  'use strict';

  angular
    .module('memebook.services')
    .service('postFirebase', [
      'FIREBASE',
      function postFirebase (FIREBASE) {

        var firebase = new Firebase(FIREBASE.DATABASE_URL);

        var posts = firebase.child(FIREBASE.POSTS);

        var postRef = posts;

        this.addPost = function (post) {
          return posts.push(post);
        };

        this.voteUp = function (p) {
          var post = posts.child(p.id);
          return post.update({
            likes: p.likes + 1
          });
        };

        this.voteDown = function (p) {
          var post = posts.child(p.id);
          return post.update({
            dislikes: p.dislikes + 1
          });
        };

        this.comment = function (p, comment) {
          var post = posts.child(p.id + '/comments/');
          return post.push({
            username: comment.username,
            text: comment.text
          });
        };

        this.onPostAdded = function (callback) {

          var callbackWrapper = function(snapshot) {
            (callback || angular.noop)(snapshot);
          };

          postRef.on('child_added', callbackWrapper);

          return {
            remove: function() {
              postRef.off('child_added', callbackWrapper);
            }
          };
        };

        this.onPostChanged = function (callback) {

          var callbackWrapper = function(snapshot) {
            (callback || angular.noop)(snapshot);
          };

          postRef.on('child_changed', callbackWrapper);

          return {
            remove: function() {
              postRef.off('child_changed', callbackWrapper);
            }
          };
        };
      }
    ]);
})();