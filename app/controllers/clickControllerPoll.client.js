'use strict';

/* some day I may know how to avoid public variables, but not today */
var userObject;
var pollObject;

(function () {

   var apiUrl5 = appUrl + '/api/:id/response'; /*global appUrl*/
   var apiUrl6 = appUrl + '/api/:id/vote'; /*global appUrl6*/
   var addResponse = document.querySelector('.btn-add-question');
   var responseContainer = document.querySelector('.response-container');
   var pollId = document.querySelector(".questionnohover").id;

   /*global ajaxFunctions*/
   /* paints the new response to the client */
   function addNewResponse (data) {
      var newObject = JSON.parse(data);
      responseContainer.innerHTML += "<div class='response response-delete' id='" +newObject['_id']+ "'>X</div><div class='response response-owned' id='" +newObject['_id']+ "'>" +newObject['responseText']+ "</div>";
      drawChart();
   }
   /* this just hides the deleted responses on the client side */
   function hideResponse (responseId) {
      document.getElementById(responseId).className += " hidden";
      document.getElementById(responseId).id += "x";
      document.getElementById(responseId).className += " hidden";
      drawChart();
   }
   /* marks a response as voted */
   function vote (data) {
      var responses = document.getElementsByClassName('response');
      for (var i = 0; i < responses.length; i++) {
         
         //wipes all responses as not selected
         if (responses[i].className == "response selected") {
            responses[i].className = "response";
         } else if (responses[i].className == "response response-owned selected") {
            responses[i].className = "response response-owned";
         }
         //responses[i].className = responses[i].className.replace(/selected/, " ");
         
         //Matches the correct selection and marks it as voted
         if (responses[i].id == data) {
            if (responses[i].className == "response") {
               responses[i].className += " selected";
            } else if (responses[i].className == "response response-owned") {
               responses[i].className += " selected";
            }
         }
      }
      drawChart();
   }
   
   //activates the add new response button
   addResponse.addEventListener('click', function() {
      var userResponse = document.querySelector(".text-add-response").value;
      if (userResponse.length > 0) {
         document.querySelector(".text-add-response").value = "";
         ajaxFunctions.ajaxRequest('GET', apiUrl5 + "/?q=" +userResponse+ "&a=" +pollObject['_id']+ "&z=" +userObject['id'], addNewResponse);
      }
   }, false);
   
   //activates the delete response (X) divs via click delegation from response-container
   responseContainer.addEventListener('click', function(event) {
      var responseId = event.target.id;
      console.log(event.target.id);
      
      /* This section deletes a response (i.e. for when the (X) is clicked) */
      if (event.target.className == 'response response-delete') {
         console.log(apiUrl5 + "/?p=" +pollObject['_id']+ "&a=" +responseId+ "&z=" +userObject['id']);
         ajaxFunctions.ajaxRequest('DELETE', apiUrl5 + "/?p=" +pollObject['_id']+ "&a=" +responseId+ "&z=" +userObject['id'], hideResponse);
      }
      /* This section casts a vote for a response */
      if (event.target.className == 'response' || event.target.className == 'response response-owned') {
         ajaxFunctions.ajaxRequest('GET', apiUrl6 + "/?p=" +pollObject['_id'] + "&a=" +responseId+ "&z=" +userObject['id'], vote);
      }
   }, false);

})();
