'use strict';

/* global userObject */
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
      userObject = JSON.parse(data);

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
      
      var userId = userObject['id'];
      ajaxFunctions.ajaxRequest('GET', apiUrl3, function (data) {
         var pollsObject = JSON.parse(data);
         questionContainer.innerHTML = '';
         
         /* Paints all Polls from all Users */
         for (var i = 0; i < pollsObject.length; i++) {
            
   	      //paints accompanying delete button if owned
   	      if (pollsObject[i]['createdById'] == userId || pollsObject[i]['createdById'] === undefined) {
   	         questionContainer.innerHTML += (
               "<div class='question question-delete' id='" +pollsObject[i]['_id']+ "'>X</div>"
   	         );
   	         questionContainer.innerHTML += (
               "<a href='/poll/?q=" +pollsObject[i]['_id']+ "&z=" +userId+ "'><div class='question-owned' id='" +pollsObject[i]['_id']+ "'>" +pollsObject[i]['question']+ "</div></a>"
   	      );
   	      } else {
   	         questionContainer.innerHTML += (
               "<a href='/poll/?q=" +pollsObject[i]['_id']+ "&z=" +userId+ "'><div class='question' id='" +pollsObject[i]['_id']+ "'>" +pollsObject[i]['question']+ "</div></a>"
   	         );
   	      }
         }
      });

   }));
})();
