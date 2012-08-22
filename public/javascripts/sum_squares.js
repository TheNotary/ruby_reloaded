function SumSquares(){}

var gridX;  // length of array
var gridY;  // width of array
SumSquares.generateSquareButton = function(dimensionString){
	var dimensions = SumSquares.formatString(dimensionString);
	gridX = dimensions[0];
	gridY = dimensions[1];
	
	SumSquares.buildSquare(dimensions);
	SumSquares.debugPopulateMatrix([[1,2,3,4],[5,6,7,8],[9,10,13,14],[15,16,17,18]]);
}

// takes in "4x4" and outputs [4, 4]
SumSquares.formatString = function(dimensionString){
	dimensionString = dimensionString.replace("x", " ").replace(",", " ").split(" ");
	
	return dimensionString;
}


SumSquares.buildSquare = function(dimensions){
	var htmlToPut = getMatrixHtmlFromDimensions(dimensions);
	
	$('#matrixBay').html(htmlToPut);
}


function getMatrixHtmlFromDimensions(dimensions){
	$.ajaxSetup({ async: false });
	var queryUrl =  "/cute_lil_functions/get_matrix_html_from_dimensions?x=" + dimensions[0] + "&y=" + dimensions[1];
	var jqxhr = $.ajax(queryUrl);
    
    return jqxhr.responseText;
}


SumSquares.debugPopulateMatrix = function(inputArray){
	var flatArray = $.map( inputArray, function(n){ return n; });
	
	var i = 0;
	for (var r = 0; r < 4; r++){
		for (var c = 0; c < 4; c++){
			var element = document.getElementById('r'+r+'c'+c);
			element.value = flatArray[i];
			i++;
		}
	}
}

var gMatrix;
SumSquares.solveButton = function(){
	SumSquares.initMatrixView();
	
	var formattedMatrix = [];
	for (var r = 0; r < gridY; r++){
		var rowArray = [];
		for (var c = 0; c < gridX; c++){
			var element = document.getElementById('r'+r+'c'+c);
			rowArray.push(parseInt(element.value));
		}
		formattedMatrix.push(rowArray);
	}
	gMatrix = formattedMatrix;
	
	var s = SumSquares.getSumOfSquaresDataForArray(formattedMatrix);
	
	if (s == false){
		alert('there was a problem calculating the array...');
		return;
	}
	
	SumSquares.colorMatrixBasedOnMinMax(s['min_slots'], s['max_slots']);
	
}

SumSquares.initMatrixView = function(){
	$('.minimum').removeClass('minimum');
	$('.maximum').removeClass('maximum');
}

// if there's a problem, return false
SumSquares.getSumOfSquaresDataForArray = function(matrix){
	jsonMatrix = JSON.stringify(matrix);
	$.ajaxSetup({ async: false });
	var queryUrl =  "/cute_lil_functions/get_sum_of_squares_data_for_array?matrix=" + jsonMatrix;
	var jqxhr = $.ajax(queryUrl);
	
    var jsonObj = JSON.parse(jqxhr.responseText);
    return jsonObj;
}



SumSquares.colorMatrixBasedOnMinMax = function(minSlots, maxSlots){
	$.each(minSlots, function(i, e){
		SumSquares.paintMatrixSlot(e, "minimum");
	});
	
	$.each(maxSlots, function(i, e){
		SumSquares.paintMatrixSlot(e, "maximum");
	});
	
}

var glob;
var gElementMatrix;
// create a matrix consisting of html input elements...
SumSquares.paintMatrixSlot = function(desiredSlot, colorString){
	var slot_number = 0;
	// get the top and bottom rows selected...
	for (var i = 0; i < gMatrix.length-1; i++){
		var top_row = gMatrix[i]
        var bottom_row = gMatrix[i+1]
        
        // then watch all squares that would be summed
        for (var j = 0; j < top_row.length-1; j++){
	        if (slot_number == desiredSlot){
	        	var a = "r"+i+"c"+j;
		        var b = "r"+i+"c"+(j+1);
		        var c = "r"+(i+1)+"c"+j;
		        var d = "r"+(i+1)+"c"+(j+1);
	        	a = $('#'+a);
	        	b = $('#'+b);
	        	c = $('#'+c);
	        	d = $('#'+d);
	        	a.addClass(colorString);
	        	b.addClass(colorString);
	        	c.addClass(colorString);
	        	d.addClass(colorString);
        	}
	        slot_number++;
      	}
	}
}

SumSquares.colorMatrixSlot = function(slot){
	
}