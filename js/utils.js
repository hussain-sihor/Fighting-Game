function detectCollision (player , enemy){
  return(
      player.attackBox.position.x + player.attackBox.width >= enemy.position.x  && player.attackBox.position.x <= enemy.position.x + enemy.width && player.attackBox.position.y+player.attackBox.height >= enemy.position.y && player.attackBox.position.y <= enemy.position.y+enemy.height && player.isAttacking
  )
  
}


function decreaseTimmer(){
  timmerId =  setTimeout(decreaseTimmer,1000);
       if(timmerValue > 0){
       timmerValue -= 1;
       document.querySelector('#timmer').innerHTML = timmerValue
       }
       else{
         clearTimeout(timmerId);
         matchOver = true;
         declareWinner();
       }
}


function declareWinner(){
  if(enemy.health == player.health){
   document.querySelector('#winnerStament').style.display = "flex";
   document.querySelector('#winnerStament').innerHTML = "Its a Tie";
  }
  else if(enemy.health > player.health){
   document.querySelector('#winnerStament').style.display = "flex";
   document.querySelector('#winnerStament').innerHTML = "Player 2 Wins";
  }
  else{
   document.querySelector('#winnerStament').style.display = "flex";
   document.querySelector('#winnerStament').innerHTML = "Player 1 Wins";
  }
}



