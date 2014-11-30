/*
 Outline of JavaScript summary Assignment 3
 1.   	Onclick handlers for all talbe Cells
 2.     Modifies the contents and style of a cell that the user clicks
 3.     Displays a message in the document (not an alert) that includes the table cell cordinates
 4.     Uses Required Elments (test field, select, button)
 5.     Uses JS and CSS to position and animate and HTML element
 6.     Includes a chekcpoint file with progress report


 
*/



function getGrid() {
    var _gridSize = setLevel();
    var _gameArray = gameController(_gridSize);
    var _ggrid = document.getElementById("gameGrid");
   
    _ggrid.innerHTML = createGrid(_gridSize, _gameArray);
    addOnclick();
    var _movement = document.getElementById("animantion");
    _movement.innerHTML = animation();

}

function addOnclick() {
    var location = document.getElementsByTagName("td");
    for (i = 0; i < location.length; i++) {
        location[i].onclick = function test() {
            var col = this.cellIndex;
            var row = this.parentNode.rowIndex;
            this.className = 'clicked'
            this.innerHTML = '[' + col + "," + row + ']';
            var _tgrid = document.getElementById("tgrid");
            cell = _tgrid.rows[row].cells[col];
            var _coordinates = document.getElementById("coordiantes");
            _coordinates.innerHTML = displayCoordinates(cell);
        };// end function

    }// end for loop

 }

function displayCoordinates(cell)
{

    var _coordinates = document.getElementById("coordiantes");
    var _coordianteHTML = "<textarea> The corrdinates of the cell previously cliked are: ";
    if (cell == undefined) {
        _coordianteHTML += "</textarea>";
    } else {
        _coordianteHTML += '[' + cell.parentNode.rowIndex + "," + cell.cellIndex + ']';
        _coordianteHTML += "</textarea>";
    }
    return _coordianteHTML;
}

function animation() {
    var _movement = document.getElementById("animantion");
    var _animantionHTML = "<p id='flying'> Do you want to see the car race across the screen?</p> <p> If this was your dream car what would it be?  <select id ='selection'> <option value='ford'>Ford</option> <option value='buick'>Buick</option> <option value='chevy'>Chevy</option><option value='wagon'>Wagon</option></select> </br> </p></br><p> Milliseconds Per Frame:  <input id='milliseconds' type='text' size='5' value='10'> Distance Moved: <input id='distance' type='text' size='5' value='20'></p> </br> <button type='button' onclick = 'start()'> start </button></p>"

    return _animantionHTML;
}

function newselection() {
    alert(document.getElementById("selection").value);
}


function start() {

    alert("You selected a : " + document.getElementById("selection").value);
   
    _carimg = document.getElementById("carimg");
    
    var _milliseconds = document.getElementById("milliseconds");
    milliperframe = _milliseconds.value;

    var _cardiv = document.getElementById("cardiv");
    
    _carDivWidth = _cardiv.offsetWidth;
    carLeft = 0;

    alert("The car will move at " + milliperframe + " frames per second");
    alert("and will move at frames " + document.getElementById('distance').value +  " in each movement");+ 

    setTimeout(moveCar, milliperframe);
}

function moveCar() {
    var _distance = document.getElementById("distance");
    distMoved = parseInt(_distance.value);
    carLeft += distMoved;
    _carimg.style.left = carLeft + "px";

    if (carLeft < _carDivWidth - _carimg.width) {
        setTimeout(moveCar, milliperframe);
    }
}



function setLevel() {

    var buttons = document.getElementById("gameLevel");
    for (h = 0; h < buttons.length; h++) {
        if (buttons[h].checked) {
            _gridSize = buttons[h].value;
        }
    }

    return _gridSize;

}


function gameController(_gridSize)
{

    _boxes = (_gridSize * _gridSize) + 1;

    var _temporary = new Array(_boxes);;
    var count = 1;
    var _gameArray = new Array();
    
    for (i = 0; i < _gridSize; i++) {
        _gameArray[i] = new Array();
        for (j = 0; j < _gridSize; j++) {
            _gameArray[i][j] = 0;
        }
    }



    for (i = 0; i < _gridSize; i++) {
        
        _bombId = Math.floor((Math.random() * _boxes) + 1);

            if (_temporary[_bombId] == true) {
                        i--;
                    } else {
                _temporary[_bombId] = true;
                  }
    }

    

    
    for (i = 0; i < _gridSize; i++) {

        for (j = 0; j < _gridSize; j++) {

                _gameArray[i][j] = _temporary[count];
                count++;

        }

    }

    
    for (i = 0; i < _gridSize; i++) {
        for (j = 0; j < _gridSize; j++) {
            _adjacent = 0;

            if ((i - 1) >= 0) {
                if((j - 1) >= 0) {
                    if (_gameArray[i - 1][j - 1] === true) {
                        _adjacent++;
                    }
                }
                if (_gameArray[i - 1][j] === true) {
                    _adjacent++;
                }

                if((j + 1) < _gameArray[j].length) {
                    if (_gameArray[i - 1][j + 1] === true) {
                        _adjacent++;
                    }
                }
            }

            if ((j - 1) >= 0) {
                if ((_gameArray[i][j - 1]) === true) {
                    _adjacent++;
                }
            }

            if ((j + 1) < _gameArray[j].length) {
                if ((_gameArray[i][j + 1]) === true) {
                    _adjacent++;
                }
            }


            if ((i + 1) < _gameArray[i].length) {
                if ((j + 1) < _gameArray[j].length) {
                    if (_gameArray[i + 1][j + 1] === true) {
                        _adjacent++;
                    }
                }
                if (_gameArray[i + 1][j] === true) {
                    _adjacent++;
                }

                if ((j - 1) >= 0) {
                    if (_gameArray[i + 1][j - 1] === true) {
                        _adjacent++;
                    }
                }
            }


            if (_gameArray[i][j] !== true) {
                _gameArray[i][j] = _adjacent;
            }



        } // end j loop
    } // end i loop
   
    return _gameArray;
}

// I will need a function that places flags
function setFlags(_gameArray) {

}

//I will need a function that counts down the bombs based on flags placed
function bombCount(_flagCount) {

}

//I will need a function to count the time that the user is playing the game
function clockCount() {

}

//********************************************* end controller ************************************

function createGrid(_gridSize, _gameArray) {

    _cellNumber = 1;


    var html = "<table><tbody id='tgrid'>";

    for (i = 0; i < _gridSize; i++) {
        html += "<tr>";
        for (j = 0; j < _gridSize; j++) {
                html += "<td id = '" + _cellNumber + "' class = 'something' >" + ' ' + "</td>";
                _cellNumber++;
            }// end j loop
                           
        html += "</tr>";

    } // end i loop

    html += "</tbody></table>";
    return html;

} // end function

