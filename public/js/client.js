/* global TrelloPowerUp */

// we can access Bluebird Promises as follows
var Promise = TrelloPowerUp.Promise;
TrelloPowerUp.trello = {};

/* Pour futur usages
/*var trello = Trello;

var authenticationSuccess = function() { 
  console.log('Successful authentication');
};
var authenticationFailure = function() {
  console.log('Failed authentication');
};

$(function(){
  var opts = {
    url : "http://test.test.fr",
    type : 'popup',
    name : 'Spie OC',
    persist : true,
    scope : { read: true, write: true, account: false },
    expiration : 'never',
    success: authenticationSuccess,
    error: authenticationFailure
  };
  console.log(opts);
  trello.authorize(opts);
})*/

/*

Trello Data Access

The following methods show all allowed fields, you only need to include those you want
They all return promises that resolve to an object with the requested fields

Get information about the current board
t.board('id', 'name', 'url', 'shortLink', 'members')

Get information about the current list (only available when a specific list is in context)
So for example available inside 'attachment-sections' or 'card-badges' but not 'show-settings' or 'board-buttons'
t.list('id', 'name', 'cards')

Get information about all open lists on the current board
t.lists('id', 'name', 'cards')

Get information about the current card (only available when a specific card is in context)
So for example available inside 'attachment-sections' or 'card-badges' but not 'show-settings' or 'board-buttons'
t.card('id', 'name', 'desc', 'due', 'closed', 'cover', 'attachments', 'members', 'labels', 'url', 'shortLink', 'idList')

Get information about all open cards on the current board
t.cards('id', 'name', 'desc', 'due', 'closed', 'cover', 'attachments', 'members', 'labels', 'url', 'shortLink', 'idList')

Get information about the current active Trello member
t.member('id', 'fullName', 'username')

*/

/*

Storing/Retrieving Your Own Data

Your Power-Up is afforded 4096 chars of space per scope/visibility
The following methods return Promises.

Storing data follows the format: t.set('scope', 'visibility', 'key', 'value')
With the scopes, you can only store data at the 'card' scope when a card is in scope
So for example in the context of 'card-badges' or 'attachment-sections', but not 'board-badges' or 'show-settings'
Also keep in mind storing at the 'organization' scope will only work if the active user is a member of the team

Information that is private to the current user, such as tokens should be stored using 'private'

t.set('organization', 'private', 'key', 'value');
t.set('board', 'private', 'key', 'value');
t.set('card', 'private', 'key', 'value');

Information that should be available to all users of the Power-Up should be stored as 'shared'

t.set('organization', 'shared', 'key', 'value');
t.set('board', 'shared', 'key', 'value');
t.set('card', 'shared', 'key', 'value');

If you want to set multiple keys at once you can do that like so

t.set('board', 'shared', { key: value, extra: extraValue });

Reading back your data is as simple as

t.get('organization', 'shared', 'key');

Or want all in scope data at once?

t.getAll();

*/

var HYPERDEV_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Fhyperdev.svg';
var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';
var WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';

var randomBadgeColor = function() {
  return ['green', 'yellow', 'red', 'none'][Math.floor(Math.random() * 4)];
};

var getBadges = function(t){
  return t.card('name')
  .get('name')
  .then(function(cardName){
    console.log('We just loaded the card name for fun: ' + cardName);
    
    return [
    {
      // card detail badges (those that appear on the back of cards)
      // also support callback functions so that you can open for example
      // open a popup on click
      title: 'Données supplémentaires', // for detail badges only
      text: 'Informations',
      icon: GRAY_ICON, // for card front badges only
      callback: function(context) { // function to run on click
        return context.popup({
          title: 'Informations suppémentaires',
          url: './otherFields.html',
          height: 400, // we can always resize later, but if we know the size in advance, its good to tell Trello
          width : 'auto'
        });
      }
    }
    ];
  });
};

// We need to call initialize to get all of our capability handles set up and registered with Trello
TrelloPowerUp.initialize({
  // NOTE about asynchronous responses
  // If you need to make an asynchronous request or action before you can reply to Trello
  // you can return a Promise (bluebird promises are included at TrelloPowerUp.Promise)
  // The Promise should resolve to the object type that is expected to be returned
  
  'authorization-status': function(t, options){
    // return a promise that resolves to the object with
    // a property 'authorized' being true/false
    // you can also return the object synchronously if you know the answer synchronously
    return new TrelloPowerUp.Promise(function(resolve){ resolve({ authorized: true })});
  },
  'card-detail-badges': function(t, options) {
    return getBadges(t);
  },
  'show-settings': function(t, options){
    // when a user clicks the gear icon by your Power-Up in the Power-Ups menu
    // what should Trello show. We highly recommend the popup in this case as
    // it is the least disruptive, and fits in well with the rest of Trello's UX
    return t.popup({
      title: 'Settings',
      url: './settings.html',
      height: 250 // we can always resize later, but if we know the size in advance, its good to tell Trello
    });
  }
});

console.log('Loaded by: ' + document.referrer);