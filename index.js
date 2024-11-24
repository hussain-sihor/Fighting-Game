const canvas = document.querySelector("canvas");

const gravity = 0.3
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

let lastKey1;
let lastKey2;
let timmerValue = 60;
let timmerId;
let matchOver = false;

//CLASSES FIlES

const background = new Scene({
    position:{
        x:0,
        y:0,
    },
    imageSrc: './image/Background/Background_1.png'
})

const shop = new Scene({
    position:{
        x:630,
        y:127,
    },
    imageSrc: './image/Background/shop.png',
    scale:2.75,
    maxFrames: 6
})



const player = new Avatar({
	position: { x: 0, y: 0 },
	velocity: { x: 0, y: 0 },
    offset:{
        x:0,
        y:0
    },
    imageSrc:'./image/Fighter/idle.png',
    scale:2.5,
    maxFrames: 8,
    offset:{
        x:215,
        y:157
    },
    sprites:{
        idle:{
        imageSrc:'./image/Fighter/idle.png',
        maxFrames:8,
        },
        run:{
        imageSrc:'./image/Fighter/run.png',
        maxFrames:8,    
        },
        jump:{
        imageSrc:'./image/Fighter/jump.png',
        maxFrames:2,    
        },
        attack:{
        imageSrc:'./image/Fighter/attack.png',
        maxFrames:6,    
        }
    },
    attackBoxx:{
        offset:{
            x:60,
            y:50
        },
        width: 150,
        height:50
    }
});;

const enemy = new Avatar({
	position: { x: 800, y: 0 },
	velocity: { x: 0, y: 0 },
    color : "green",
    offset:{
        x:-50,
        y:0
    },
    imageSrc:'./image/Enemy/idle.png',
    scale:2.5,
    maxFrames: 4,
    offset:{
        x:215,
        y:167
    },
    sprites:{
        idle:{
        imageSrc:'./image/Enemy/idle.png',
        maxFrames:4,
        },
        run:{
        imageSrc:'./image/Enemy/run.png',
        maxFrames:8,    
        },
        jump:{
        imageSrc:'./image/Enemy/jump.png',
        maxFrames:2,    
        },
        attack:{
        imageSrc:'./image/Enemy/attack.png',
        maxFrames:4,    
        }
    },
    attackBoxx:{
        offset:{
            x:-140,
            y:50
        },
        width: 150,
        height:50
    }
});

const keys = {
    a:{
        pressed:false,
    },
    d:{
      pressed:false,
    },
    ArrowRight:{
        pressed:false,
    },
   ArrowLeft:{
        pressed:false
    }
}


//UTILS FILES
decreaseTimmer();


function animate() {
	window.requestAnimationFrame(animate);
    c.fillStyle = "black"
    c.fillRect(0,0,canvas.width,canvas.height);

	background.update();
	shop.update();
    player.update();
	enemy.update();


    
    // PLAYER MOVMENT
    if(keys.a.pressed && lastKey1 == 'a'){
        player.switchSprites("run",player.sprites.run)
        player.velocity.x = -4
    }
    else if(keys.d.pressed && lastKey1 == 'd'){
        player.switchSprites("run",player.sprites.run)
        player.velocity.x = 4
    }
    else{
        player.switchSprites("idle",player.sprites.idle)
        player.velocity.x = 0
    }
    if(player.velocity.y < 0 ){
        player.switchSprites("jump",player.sprites.jump)
    }

    // ENEMY MOVMENT
    if(keys.ArrowLeft.pressed && lastKey2 == 'ArrowLeft'){
        enemy.switchSprites("run",enemy.sprites.run)
        enemy.velocity.x = -4
    }
    else if(keys.ArrowRight.pressed && lastKey2 == 'ArrowRight'){
        enemy.switchSprites("run",enemy.sprites.run)
        enemy.velocity.x = 4
    }
    else{
        enemy.switchSprites("idle",enemy.sprites.idle)
        enemy.velocity.x = 0
    }
    if(enemy.velocity.y < 0 ){
        enemy.switchSprites("jump",enemy.sprites.jump)
    }


    //DETECT COLLISION
    if(detectCollision(player,enemy)){
        if(matchOver){return}
        
           setTimeout(()=>{
            enemy.health -= 10;
            document.querySelector('#enemyHealth').style.width=`${enemy.health}%`;
        },500)
        player.isAttacking = false;
          

       
    }
    if(detectCollision(enemy,player)){
        if(matchOver){return}

        setTimeout(()=>{
            player.health -= 10;
            document.querySelector('#playerHealth').style.width=`${player.health}%`;
        },500)
        enemy.isAttacking = false;
        
    }

    if(enemy.health <= 0 || player.health <= 0 ){
        matchOver = true;
        clearTimeout(timmerId);
        declareWinner();
    }
}


animate()


window.addEventListener('keydown',(event)=>{



   switch(event.key){
    case 'd' :
        keys.d.pressed = true
        lastKey1 = 'd'
       break;

    case 'a' :
        keys.a.pressed = true
        lastKey1 = 'a'
       break;

    case 'w' :
        if(player.position.y + player.height >= 480){
            player.velocity.y = -13
        }
       break;

    case ' ':
        player.attack();
        break;

   }

   switch(event.key){
    case 'ArrowRight' :
        keys.ArrowRight.pressed = true
        lastKey2 = 'ArrowRight'
       break;
    case 'ArrowLeft' :
        keys.ArrowLeft.pressed = true
        lastKey2 = 'ArrowLeft'
       break;
    case 'ArrowUp' :
        if(enemy.position.y + enemy.height >= 480){
            enemy.velocity.y = -13
        }
       break;
    case 'ArrowDown' :
        enemy.attack();
        break;
   }
   
})

window.addEventListener('keyup',(event)=>{
   
   switch(event.key){
    
    case 'd' :
        keys.d.pressed = false
       break;
    case 'a' :
        keys.a.pressed = false
       break;

   }

   switch(event.key){
    case 'ArrowRight' :
        keys.ArrowRight.pressed = false
       break;
    case 'ArrowLeft' :
        keys.ArrowLeft.pressed = false
       break;
   }

})