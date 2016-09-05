'use strict';

/* global pollObject myTestVar */
var counter = 0;
var apiUrl4 = appUrl + '/api/:id/editquestion/?z='; /*global appUrl*/

function getUpdatedPoll() {
    console.log(userObject);
    /* check if userObject exists before continuing */
    var responseArray = [];
        
    var apiUrl4WithId = apiUrl4 + userObject['id'];
        
    ajaxFunctions.ajaxRequest('GET', apiUrl4WithId, function (data) {
        pollObject = JSON.parse(data);        
        
        for (var i = 0; i < pollObject['responses'].length; i++) {
            responseArray.push([pollObject['responses'][i]['responseText'], pollObject['responses'][i]['votes'].length]); // 
        }
        paintChart(responseArray);  //send poll data to make chart
    });
}

// Callback _and_ chart update function
function drawChart() {
    console.log(counter);
	//check for userObject, wait for it 
	if (userObject) {
        getUpdatedPoll();   // Now send for the updated poll data object
    } else if (counter == 0) {
        counter += 1;
        var timeoutID = window.setTimeout(drawChart(), 500);
    } else if (counter > 6) {
        counter = 0;
        return false;
    } else {
        counter += 1;
    }
}

function paintChart(chartDataArray) {
    
    // Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Answers');
	data.addColumn('number', 'No. of votes');
	
    var chartTitle = pollObject['question'];
	data.addRows(chartDataArray);
	
	// Set chart options
	var options = {'title': chartTitle,
	               'width':560,
	               'height':440};
	
	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
	chart.draw(data, options);
}
            
	
