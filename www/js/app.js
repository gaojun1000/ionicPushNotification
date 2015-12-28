// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $ionicPopup, $rootScope) {
  $ionicPlatform.ready(function() {


    var onNotificationRegistered = function (data) {           
        //store it to your server
        console.log(data.registrationId);
    };

    var onNotificationReceived = function (data) {
        if (data.additionalData.foreground) {
            //broadcast an event in case other parties are interested.
            $rootScope.$broadcast("onNotificationReceived", data);
            console.log("notification recieved while app is running in foreground");

            $ionicPopup.confirm({
                template: data.message,
                title: 'Notification Received',
                buttons: [
                    {
                        text: 'Yes',
                        type: 'button-positive',
                        onTap: function(e) {
                            
                        }
                    },
                    {
                        text: 'Later'
                    }
                ]
            });

        } else {
            console.log("notification recieved while app is running in backgroud or the app is just launched from push notification");
            //the app is running in the backgroud or the app is launched from push notification
        }
    };


    var pushNotification = PushNotification.init({
        android: {
            //google project id 12 digits
            senderID: 526592590225
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        }
    });

    //callback when registration is done successfully
    pushNotification.on('registration', onNotificationRegistered);

    //callback when notification is retrieved
    pushNotification.on('notification', onNotificationReceived);

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
