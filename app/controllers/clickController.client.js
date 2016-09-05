'use strict';

var userObject;
var pollObject;
//module.exports.pollObject = pollObject;

(function () {

   var apiUrl2 = appUrl + '/api/:id/question'; /*global appUrl*/
   var addQuestion = document.querySelector('.btn-add-question');
   var deleteQuestion = document.querySelector('.question-container');
   var questionContainer = document.querySelector('.question-container');

   /*global ajaxFunctions*/

   /*function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
   }*/
   
   function addNewQuestion (data) {
      pollObject = JSON.parse(data);
      addQuestion.value = "";
      questionContainer.innerHTML += (
      "<div class='question question-delete' id='" +pollObject['_id']+ "'>X</div>" +
      "<a href='/poll/?q=" +pollObject['_id']+ "&z=" +userObject['id']+ "'><div class='question-owned' id='" +pollObject['_id']+ "'>" 
      +pollObject['question']+ "</div></a>"
      );
   }
   
   function delQuestion (data) {
      //clear deleted poll from list
      document.getElementById(data).className += " hidden";
      document.getElementById(data).id += "x";
      document.getElementById(data).className += " hidden";
   }

   //ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount));

   //activates the add new poll button
   addQuestion.addEventListener('click', function() {
      var userQuestion = document.querySelector(".text-add-question").value;
      ajaxFunctions.ajaxRequest('GET', apiUrl2 + "/?q=" +userQuestion+ "&z=" +userObject['id'], addNewQuestion);
   }, false);
   
   //activates the delete buttons via 'delegation' from question-container
   deleteQuestion.addEventListener('click', function(event) {
      if (event.target.className == 'question question-delete') {
         ajaxFunctions.ajaxRequest('DELETE', apiUrl2 + "/?p=" +event.target.id, delQuestion);
      }
   }, false);

})();
