let Game = (function(){

  // DOM elements
  let gameBoard = document.getElementById("board");
  let chooseSymbol = document.getElementById("chooseSymbol");
  let tiles = document.querySelectorAll("#board .tile");

  let playerTurn = false;
  let playerSymbol = "";
  let computerSymbol = "";
  let boardArray = ["","","","","","","","",""];

  let options = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  
  // Function to get everything rolling
  function init(){
    console.log();
    events();
  }

  // Handle all events
  function events(){
    // Event handler for selecting symbol
    chooseSymbol.addEventListener("click", function(e){
      if(e.target.classList.contains("symbol")){
        playerSymbol = (e.target.classList.contains("symbol-o")) ? "O" : "X";
        computerSymbol = (playerSymbol == "O") ? "X" : "O";

        startGame();
      }      
    });

    // Event handler for placing symbol
    gameBoard.addEventListener("click", handlePlayerInput);
  }

  function startGame(){
    // Hide chooseSymbol and show gameBoard
    gameBoard.style.opacity = 1;
    chooseSymbol.style.display = "none";

    // Allow player to go first
    playerTurn = true;
  }

  // Handle user click on board
  function handlePlayerInput(e){
    // Only continue if 1) a tile is clicked, 2) it's the player's turn, 3) the clicked tile is empty 
    if(!e.target.classList.contains("tile") || !playerTurn || boardArray[e.target.dataset.val-1] != ""){
      return false;
    }

    boardArray[e.target.dataset.val-1] = playerSymbol;   // add symbol to array
    e.target.innerHTML = `<span>${playerSymbol}</span>`;  // add symbol in tile

    // Check for winning move, else let computer make a move
    if(isWinningMove()){
      reset("win");
    }else{
      playerTurn = false;   // disable player
      computerTurn();
    }

  }

  function reset(result){
    let msg = "You won!";
    if(result == "lose"){
      msg = "You lost...";
    }else if(result == "draw"){
      msg = "It's a draw";
    }

    alert(msg);
    clearBoard();
    playerTurn = true;
  }

  function computerTurn(){
    if(boardArray.indexOf("") == -1){ 
      reset("draw")
      return false;
    }

    let pos = Math.floor(Math.random()*9);
    while(boardArray[pos] != ""){
      pos = Math.floor(Math.random()*9);
    }

    boardArray[pos] = computerSymbol;
    tiles[pos].innerHTML = `<span>${computerSymbol}</span>`;

    // Check for winning move, else wait for player to make turn
    if(isWinningMove()){
      reset("lose");
      return false;
    }else{
      playerTurn = true;   // disable player
    }

    if(boardArray.indexOf("") == -1){ 
      reset("draw");
      return false;
    }
  }

  function clearBoard(){
    boardArray = ["","","","","","","","",""];
    for(let i = 0; i < 8; i++){
      gameBoard.childNodes.forEach(function(child){
        child.innerHTML = "";
      });
    }
  }

  function isWinningMove(){
    let checkSymbol = playerTurn ? playerSymbol : computerSymbol;
    for(let i = 0; i < options.length; i++){
      if(boardArray[options[i][0]] == boardArray[options[i][1]] && boardArray[options[i][1]] == boardArray[options[i][2]] && boardArray[options[i][0]] == checkSymbol){
        return true;
      }
    }

    return false;
  }

  return {
    init: init
  };
})();

Game.init();
