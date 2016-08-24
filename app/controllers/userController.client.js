'use strict';

(function () {

   var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   var profileRepos = document.querySelector('#profile-repos') || null;
   var displayName = document.querySelector('#display-name');
   var apiUrl = appUrl + '/api/:id';   /*global appUrl*/
   var apiUrl3 = appUrl + '/api/:id/allquestions'; /*global appUrl*/
   var questionContainer = document.querySelector('.question-container');

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }
   /* global ajaxFunctions */
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);

      if (userObject.displayName !== null) {
         updateHtmlElement(userObject, displayName, 'displayName');
      } else {
         updateHtmlElement(userObject, displayName, 'username');
      }

      if (profileId !== null) {
         updateHtmlElement(userObject, profileId, 'id');   
      }

      if (profileUsername !== null) {
         updateHtmlElement(userObject, profileUsername, 'username');   
      }

      if (profileRepos !== null) {
         updateHtmlElement(userObject, profileRepos, 'publicRepos');   
      }

   }));
   /* Gets all Polls from all Users ... I hope */
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl3, function (data) {
      var userObject = JSON.parse(data);
      for (var i = 0; i < userObject.length; i++) {
         questionContainer.innerHTML += "<div class='question'>Question: " +userObject[i]['question']+ "</div>";
      }
      
   }));
   
})();
