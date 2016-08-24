'use strict';

(function () {

   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var apiUrl = appUrl + '/api/:id/clicks'; /*global appUrl*/
   var apiUrl2 = appUrl + '/api/:id/question'; /*global appUrl*/
   var addQuestion = document.querySelector('.btn-add-question');
   var questionContainer = document.querySelector('.question-container');

   /*global ajaxFunctions*/

   function updateClickCount (data) {
      var clicksObject = JSON.parse(data);
      clickNbr.innerHTML = clicksObject.clicks;
   }
   
   function addNewQuestion (data) {
      //var pollObject = JSON.parse(data);
      questionContainer.innerHTML += "<div class='question'>Question: " +data+ "</div>";
   }

   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount));

   addButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);

   deleteButton.addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('DELETE', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);
   
   addQuestion.addEventListener('click', function() {
      var userQuestion = document.querySelector(".text-add-question").value;
      console.log("sending: " +apiUrl2 + "?" +userQuestion);
      ajaxFunctions.ajaxRequest('GET', apiUrl2 + "/?q=" +userQuestion, addNewQuestion);
      
   }, false);

})();
