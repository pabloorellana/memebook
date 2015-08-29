angular.module('myapp').service('firebaseFactory', function () {
  return function (url) {
    var firebase = new Firebase(url);
    var members = firebase.child('members');
    var messages = firebase.child('messages');

    this.addMember = function (member) {
      return members.push(member);
    };

    this.addMessage = function (sender, message) {
      messages.push({
        sender: sender,
        message: message
      });
    };
  };
});