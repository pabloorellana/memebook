(function () {

  'use strict'

  angular
    .module('memebook.services')
    .service('postFirebase', [
      'FIREBASE',
      postFirebase
    ]);

  function postFirebase (FIREBASE) {

    var firebase = new Firebase(FIREBASE.DATABASE_URL);

    var posts = firebase.child(FIREBASE.POSTS);

    this.addPost = function (post) {
      return posts.push(post);
    };

    this.voteUp = function (p) {
      var post = posts.child(p.id);
      return post.update({
        likes: p.likes
      });
    };

    this.voteDown = function (p) {
      var post = posts.child(p.id);
      return post.update({
        dislikes: p.dislikes
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

  };
})();