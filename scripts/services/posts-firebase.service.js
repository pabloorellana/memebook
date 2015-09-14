(function () {

  'use strict';

  angular
    .module('memebook.services')
    .service('postFirebase', [
      'FIREBASE',
      function postFirebase (FIREBASE) {

        var firebase = new Firebase(FIREBASE.DATABASE_URL);

        var posts = firebase.child(FIREBASE.POSTS);

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

        this.onPostAdded = function (cb) {
          posts.on('child_added', cb, function (err) {
            console.log(err);
          });
        };

        this.onPostUpdated = function (cb) {
          posts.on('child_changed', cb);
        };
      }
    ]);
})();