var time = 0;
var rows = 0;
var columns = 0;
var mines = 0;
var testMode = false;
var firstClick = 0;
var placed = 0;
var movesMade;
// var tileObjectArray = [];

//creating a Tile Object
function Tile() {
  this.mined = false;
  this.revealed = false;
  this.flagged = false;
  this.count = 0;
}

function buildGrid() {
    // //empty array
    // tileObjectArray = [];
    // Fetch grid and clear out old elements.
    var grid = document.getElementById("minefield");
    grid.innerHTML = "";
    var columns = 1;
    var rows = 1;
    var params = setDifficulty();
    rows=params.rows;
    columns=params.columns;
    mines=params.mines;

    // Build DOM Grid
    var tile;

    // create a 2D array of tiles
    var board = [];
    for (var r = 0; r < rows; r++) {
      var row = [];
      for (var c = 0; c < columns; c++) {
        row.push(new Tile());
      }
      board.push(row);
    }

    // Build DOM Grid
    var tile;
    for (var y = 0; y < rows; y++) {
        for (var x = 0; x < columns; x++) {
            tile = createTile(x,y);
            grid.appendChild(tile);
        }
    }
    
    console.log(board);
    var style = window.getComputedStyle(tile);

    var width = parseInt(style.width.slice(0, -2));
    var height = parseInt(style.height.slice(0, -2));
    
    grid.style.width = (columns * width) + "px";
    grid.style.height = (rows * height) + "px";
    
}

// function createTileWithObject(tileObject) {

//     var tile = document.createElement("div");

//     tile.classList.add("tile");
//     tile.classList.add("hidden");

//     tile.addEventListener("auxclick", function(e) { e.preventDefault(); }); // Middle Click. listen and ignore native functionality
//     tile.addEventListener("contextmenu", function(e) { e.preventDefault(); }); // Right Click. listen and ignore native functionality
    
//     //using mouseup dblclicks for some reason.
//     tile.addEventListener("mousedown", function(){
//         handleTileClick(event, tileObject, tile);
//     });

//     // tile.addEventListener("contextmenu", function(e) { e.preventDefault(); }); 

//     //get coordinates here of where all tiles are placed
//     // console.log("x : " + tileObject.x + " y: " + tileObject.y + " Is it a mine?" + tileObject.isMine);
//     return tile;

// }


function createTile(x,y) {

    var tile = document.createElement("div");

    tile.classList.add("tile");
    tile.classList.add("hidden");

    tile.addEventListener("auxclick", function(e) { e.preventDefault(); }); // Middle Click. listen and ignore native functionality
    tile.addEventListener("contextmenu", function(e) { e.preventDefault(); }); // Right Click. listen and ignore native functionality
    
    //using mouseup dblclicks for some reason.
    tile.addEventListener("mousedown", function(){
        handleTileClick(event, x,y);
    });

    return tile;

}

function startGame() {
    buildGrid();
    startTimer();
    firstClick = 0;
}

function smileyDown() {
    var smiley = document.getElementById("smiley");
    smiley.classList.add("face_down");
}

function smileyUp() {
    var smiley = document.getElementById("smiley");
    smiley.classList.remove("face_down");
}
//function to make smiley in limbo during play
function smileyLimbo() {
    var smiley = document.getElementById("smiley");
    smiley.classList.remove("face_up");
    smiley.classList.remove("face_down");
    smiley.classList.add("limbo");
}
// event, tileObject, tile
function handleTileClick() {
    //used to make the first click not be a mine/not show any numbers.
    if(firstClick == 1){
        console.log("firstClick");
        // setMinesRandomly(mines,tileObjectArray);
    }
    // Left Click
    if (event.which === 1) {
        console.log("left click");
        //TODO reveal the tile
        // tile.classList.remove("hidden");
        // tile.classList.add("clear");
        // // console.log("adding to first click");
        // firstClick++;

        // ///determine neighbours within the array
        // getNeighbours(tileObjectArray, tileObject);

        // //if player hits mine
        // if(tileObject.isMine === true && tileObject.hasFlag !== true ){
        //     console.log("hit mine");
        //     tile.classList.remove("clear");
        //     tile.classList.remove("hidden");
        //     tile.classList.add("mine_hit");
        //     smileyDown();
        // }

    }

    // right Click
    else if (event.which === 3) {
        console.log("right click");
        //TODO toggle a tile flag
        //if a flag is already set on a tile AND its still active
        //  if(tileObject.hasFlag === true && !tile.classList.contains("clear")){
        //     tileObject.hasFlag = false;
        //     tile.classList.remove("clear");
        //     tile.classList.add("hidden");
        //     tile.classList.remove("flag");
        // //if no flag is set on a tile  AND its still active
        // }else if(tileObject.hasFlag === false && !tile.classList.contains("clear")){
        //     tileObject.hasFlag = true;
        //     tile.classList.remove("hidden");
        //     tile.classList.remove("clear");
        //     tile.classList.add("flag");
        // }
        // else{}
    }
    // Middle Click
    else if (event.which === 2) {
        //TODO try to reveal adjacent tiles
        console.log("middle");

    }
}

function setDifficulty() {
    var difficultySelector = document.getElementById("difficulty");
    var difficulty = difficultySelector.selectedIndex;
    var parameters = {};
    if(difficulty==0){
         parameters = {rows:6,columns:6, mines:10};
    }else if(difficulty==1){
         parameters = {rows:16,columns:16, mines:40};
    }else if(difficulty==2){
         parameters = {rows:30,columns:16, mines:99};
    }

    return parameters;
}

//not working right. fix if there's time (ha)
function startTimer() {
    // var timer = window.clearInterval(onTimerTick, 1000);
    timeValue = 0;
    var timer = window.setInterval(onTimerTick, 1000);
}

function onTimerTick() {
    timeValue++;
    updateTimer();
}

function updateTimer() {
    document.getElementById("timer").innerHTML = timeValue;
}

//come back to this later. its picking up duplicate random numbers.
// function setMinesRandomly(minesStart,tileObjectArray){
//     var grid = document.getElementById("minefield");
//     document.getElementById('remainingMines').innerHTML = "Remaining Mines:";
//     document.getElementById('remainingMines').innerHTML = document.getElementById('remainingMines').innerHTML + ' ' + mines;
        
//     for (var i = 0; i < minesStart; i++) {
//         //get a random location on the board
//         var randBombPlace = Math.floor(Math.random() * tileObjectArray.length);
//         console.log("Planted on:" + randBombPlace);
//         tileObjectArray[randBombPlace].isMine = true;
//         placed++;
//     }
//      // console.log(tileObjectArray);

// }


function getNeighbours(tileObjectArray, tileObject){




//       var x_limit = tileObjectArray.length;
//   if (x_limit == 0) return null; //matrix is empty

//   var y_limit = tileObjectArray[1].length; //Assumes all rows in the matrix are of same length (otherwise, not a matrix, right?)

//   return {
//     'tl':((tileObject.x-1 >= 0 && tileObject.y-1 >= 0)?tileObjectArray[x-1][y-1]:null),
//     'tc':((tileObject.y-1 >= 0)?tileObjectArray[x][y-1]:null),
//     'tr':((tileObject.x+1 < x_limit && tileObject.y-1 >= 0)?tileObjectArray[x+1][y-1]:null),

//     'ml':((tileObject.x-1 >= 0)?tileObjectArray[x-1][y]:null),
//     'mr':((tileObject.x+1 < x_limit)?tileObjectArray[x+1][y]:null),

//     'bl':((tileObject.x-1 >= 0 && y+1 < y_limit)?tileObjectArray[x-1][y+1]:null),
//     'bc':((tileObject.y+1 < y_limit)?tileObjectArray[x][y+1]:null),
//     'br':((tileObject.x+1 < x_limit && tileObject.y+1 < y_limit)?tileObjectArray[x+1][y+1]:null)
//   };
// }

    // var mineCount = 0;

    // if(tileObject.x > -1 && tileObject.y > -1){

    //     var a1 = tileObject.x - 1;
    //     var a2 = tileObject.y - 1;

    //        this.mines = this.mines.filter((item) => {
    //             return (item.wineryName.toString().toLowerCase().indexOf(val.toLowerCase()) > -1 ||
    //             item.wineName.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
    //             item.wineColor.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //         })

   // }

    // var obj = tileObjectArray.find(o => o.x === '12');

    // console.log("obj here : " + obj);
    
    // var found = tileObjectArray.find(function(element) {
    //     return tileObjectArray.x < 12;
    // });

    // console.log(found);
    // for (var i = 0; i < tileObjectArray.length(); i++) {
        
    // }

//}

}



// var time = 0;
// var rows = 0;
// var columns = 0;
// var mines = 0;
// var testMode = false;
// var firstClick = 0;
// var placed = 0;
// var movesMade;
// var tileObjectArray = [];


// function buildGrid() {
//     //empty array
//     tileObjectArray = [];
//     // Fetch grid and clear out old elements.
//     var grid = document.getElementById("minefield");
//     grid.innerHTML = "";
//     var params = setDifficulty();
//     rows=params.rows;
//     columns=params.columns;
//     mines=params.mines;
//     // Build DOM Grid
//     var tile;
//     for (var y = 0; y < rows; y++) {
//         for (var x = 0; x < columns; x++) {
//                     //create a tile object instead with a mine flag.
//                     var tileObject = {
//                     "x":x,
//                     "y":y,
//                     "isMine": false, 
//                     "hasFlag": false
//                 };
            
//             //push all known coords of tiles with isMine, hasFlag, x, y coord into an array.
//             tileObjectArray.push(tileObject);
//             tile = createTileWithObject(tileObject);
//             grid.appendChild(tile);

//         }
//     }

//     var style = window.getComputedStyle(tile);
//     var width = parseInt(style.width.slice(0, -2));
//     var height = parseInt(style.height.slice(0, -2));
//     grid.style.width = (columns * width) + "px";
//     grid.style.height = (rows * height) + "px";
    
// }


// function createTileWithObject(tileObject) {

//     var tile = document.createElement("div");

//     tile.classList.add("tile");
//     tile.classList.add("hidden");

//     tile.addEventListener("auxclick", function(e) { e.preventDefault(); }); // Middle Click. listen and ignore native functionality
//     tile.addEventListener("contextmenu", function(e) { e.preventDefault(); }); // Right Click. listen and ignore native functionality
    
//     tile.addEventListener("mousedown", function(){
//         handleTileClick(event, tileObject, tile);
//     });

//     return tile;

// }

// function startGame() {
//     buildGrid();
//     startTimer();
//     firstClick = 0;
// }

// function smileyDown() {
//     var smiley = document.getElementById("smiley");
//     smiley.classList.add("face_down");
// }

// function smileyUp() {
//     var smiley = document.getElementById("smiley");
//     smiley.classList.remove("face_down");
// }
// //function to make smiley in limbo during play
// function smileyLimbo() {
//     var smiley = document.getElementById("smiley");
//     smiley.classList.remove("face_up");
//     smiley.classList.remove("face_down");
//     smiley.classList.add("limbo");
// }

// function handleTileClick(event, tileObject, tile) {
//     //used to make the first click not be a mine/not show any numbers.
//     if(firstClick == 1){
//         console.log("firstClick");
//         setMinesRandomly(mines,tileObjectArray);
//     }
//     // Left Click
//     if (event.which === 1 && tileObject.hasFlag !== true && !tile.classList.contains("clear")) {
//         //TODO reveal the tile
//         tile.classList.remove("hidden");
//         tile.classList.add("clear");
//         // console.log("adding to first click");
//         firstClick++;

//         ///determine neighbours within the array
//         getNeighbours(tileObjectArray, tileObject);

//         //if player hits mine
//         if(tileObject.isMine === true && tileObject.hasFlag !== true ){
//             console.log("hit mine");
//             tile.classList.remove("clear");
//             tile.classList.remove("hidden");
//             tile.classList.add("mine_hit");
//             smileyDown();
//         }

//     }

//     // right Click
//     else if (event.which === 3) {
//         //TODO toggle a tile flag
//         //if a flag is already set on a tile AND its still active
//          if(tileObject.hasFlag === true && !tile.classList.contains("clear")){
//             tileObject.hasFlag = false;
//             tile.classList.remove("clear");
//             tile.classList.add("hidden");
//             tile.classList.remove("flag");
//         //if no flag is set on a tile  AND its still active
//         }else if(tileObject.hasFlag === false && !tile.classList.contains("clear")){
//             tileObject.hasFlag = true;
//             tile.classList.remove("hidden");
//             tile.classList.remove("clear");
//             tile.classList.add("flag");
//         }
//         else{}
//     }
//     // Middle Click
//     else if (event.which === 2) {
//         //TODO try to reveal adjacent tiles
//         console.log("middle");

//     }
// }

// function setDifficulty() {
//     var difficultySelector = document.getElementById("difficulty");
//     var difficulty = difficultySelector.selectedIndex;
//     var parameters = {};
//     if(difficulty==0){
//          parameters = {rows:6,columns:6, mines:10};
//     }else if(difficulty==1){
//          parameters = {rows:16,columns:16, mines:40};
//     }else if(difficulty==2){
//          parameters = {rows:30,columns:16, mines:99};
//     }

//     return parameters;
// }

// //not working right. fix if there's time (ha)
// function startTimer() {
//     // var timer = window.clearInterval(onTimerTick, 1000);
//     timeValue = 0;
//     var timer = window.setInterval(onTimerTick, 1000);
// }

// function onTimerTick() {
//     timeValue++;
//     updateTimer();
// }

// function updateTimer() {
//     document.getElementById("timer").innerHTML = timeValue;
// }

// //come back to this later. its picking up duplicate random numbers.
// function setMinesRandomly(minesStart,tileObjectArray){
//     var grid = document.getElementById("minefield");
//     document.getElementById('remainingMines').innerHTML = "Remaining Mines:";
//     document.getElementById('remainingMines').innerHTML = document.getElementById('remainingMines').innerHTML + ' ' + mines;
        
//     for (var i = 0; i < minesStart; i++) {
//         //get a random location on the board
//         var randBombPlace = Math.floor(Math.random() * tileObjectArray.length);
//         console.log("Planted on:" + randBombPlace);
//         tileObjectArray[randBombPlace].isMine = true;
//         placed++;
//     }
//      // console.log(tileObjectArray);

// }


// function getNeighbours(tileObjectArray, tileObject){




// //       var x_limit = tileObjectArray.length;
// //   if (x_limit == 0) return null; //matrix is empty

// //   var y_limit = tileObjectArray[1].length; //Assumes all rows in the matrix are of same length (otherwise, not a matrix, right?)

// //   return {
// //     'tl':((tileObject.x-1 >= 0 && tileObject.y-1 >= 0)?tileObjectArray[x-1][y-1]:null),
// //     'tc':((tileObject.y-1 >= 0)?tileObjectArray[x][y-1]:null),
// //     'tr':((tileObject.x+1 < x_limit && tileObject.y-1 >= 0)?tileObjectArray[x+1][y-1]:null),

// //     'ml':((tileObject.x-1 >= 0)?tileObjectArray[x-1][y]:null),
// //     'mr':((tileObject.x+1 < x_limit)?tileObjectArray[x+1][y]:null),

// //     'bl':((tileObject.x-1 >= 0 && y+1 < y_limit)?tileObjectArray[x-1][y+1]:null),
// //     'bc':((tileObject.y+1 < y_limit)?tileObjectArray[x][y+1]:null),
// //     'br':((tileObject.x+1 < x_limit && tileObject.y+1 < y_limit)?tileObjectArray[x+1][y+1]:null)
// //   };
// // }

//     // var mineCount = 0;

//     // if(tileObject.x > -1 && tileObject.y > -1){

//     //     var a1 = tileObject.x - 1;
//     //     var a2 = tileObject.y - 1;

//     //        this.mines = this.mines.filter((item) => {
//     //             return (item.wineryName.toString().toLowerCase().indexOf(val.toLowerCase()) > -1 ||
//     //             item.wineName.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
//     //             item.wineColor.toLowerCase().indexOf(val.toLowerCase()) > -1);
//     //         })

//    // }

//     // var obj = tileObjectArray.find(o => o.x === '12');

//     // console.log("obj here : " + obj);
    
//     // var found = tileObjectArray.find(function(element) {
//     //     return tileObjectArray.x < 12;
//     // });

//     // console.log(found);
//     // for (var i = 0; i < tileObjectArray.length(); i++) {
        
//     // }

// //}

// }
