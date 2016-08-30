'use strict';

(function () {

   var profileId = document.querySelector('#profile-id') || null;
   var profileUsername = document.querySelector('#profile-username') || null;
   var profileRepos = document.querySelector('#profile-repos') || null;
   var displayName = document.querySelector('#display-name');
   var apiUrl = appUrl + '/api/:id';   /*global appUrl*/
   var apiUrl4 = appUrl + '/api/:id/editquestion/?z='; /*global appUrl*/
   var responseContainer = document.querySelector('.response-container');
   var questionContainer = document.querySelector('.question-container');

   function updateHtmlElement (data, element, userProperty) {
      element.innerHTML = data[userProperty];
   }
   /* global ajaxFunctions global userObject */
   /* these prepare the page on load */
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
      apiUrl4 += userId;
      
      /* global pollObject */
      /* Paints the selected poll */
      ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl4, function (data) {
         pollObject = JSON.parse(data);
         var numberOfResponses = pollObject['responses'].length;
         questionContainer.innerHTML = (
            "<div class='questionnohover' id='" +pollObject['_id']+ "'>" +pollObject['question']+ "</div></a>"
	        );
	     responseContainer.innerHTML = "";
	     
	     // paints the poll's various responses
         for (var i = 0; i < numberOfResponses; i++) {
            var numberOfVotes = pollObject['responses'][i]['votes'].length;
            var isVoted = 0;
            var isOwner = 0;
            
            //checks if current user owns the response
            if (userId == pollObject['responses'][i]['createdById']) {
               isOwner = 1;
            }
            //checks if current user has voted for this response
            for (var j = 0; j < numberOfVotes; j++) {
               if (userObject['id'] == pollObject['responses'][i]['votes'][j]) {isVoted = 1;}
            }
            //if has voted, response is 'selected'
            if (isVoted == 1 && isOwner == 1) {
               responseContainer.innerHTML += (
               "<div class='response response-delete' id='" +pollObject['responses'][i]['_id']+ "'>X</div><div class='response response-owned selected' id='" +pollObject['responses'][i]['_id']+ "'>" +pollObject['responses'][i]['responseText']+ "</div>"
               );
            } else if (isVoted == 0 && isOwner == 1) {
               responseContainer.innerHTML += (
               "<div class='response response-delete' id='" +pollObject['responses'][i]['_id']+ "'>X</div><div class='response response-owned' id='" +pollObject['responses'][i]['_id']+ "'>" +pollObject['responses'][i]['responseText']+ "</div>"
               );
            } else if (isVoted == 1 && isOwner == 0){
               responseContainer.innerHTML += (
               "<div class='response selected' id='" +pollObject['responses'][i]['_id']+ "'>" +pollObject['responses'][i]['responseText']+ "</div>"
               );
            } else { // i.e. (isVoted == 0 && isOwner == 0)
               responseContainer.innerHTML += (
               "<div class='response' id='" +pollObject['responses'][i]['_id']+ "'>" +pollObject['responses'][i]['responseText']+ "</div>"
               );
            }
         }

      }));
      
   }));
   
})();
