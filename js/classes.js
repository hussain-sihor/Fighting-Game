
class Scene {

	constructor({
    position, 
    imageSrc, 
    scale = 1, 
    maxFrames = 1, 
    offset ={
    x:0,
    y:0,
    }
}) {
	this.position = position;
    this.height = 150;
    this.width = 50;
    this.image = new Image()
    this.image.src = imageSrc
    this.scale = scale
    this.maxFrames = maxFrames
    this.currenFrame = 0
    this.framesElapsed = 0
    this.framesHold = 10
    this.offset = offset
	}

	draw() {
    c.drawImage(
        this.image,
        //CROPING FOR ANIMATIONS(strtx,strty,width,height)
        this.currenFrame * (this.image.width/this.maxFrames),  
        0,
        this.image.width/this.maxFrames,
        this.image.height,
        // TO REMOVE PADDING
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        //TO MAKE IMG BIGGER
        (this.image.width/this.maxFrames) * this.scale,  
        this.image.height * this.scale
    )
  }

  animateFrames(){
    this.framesElapsed++
    if(this.framesElapsed % this.framesHold == 0){
    if(this.currenFrame < this.maxFrames - 1 ){
        this.currenFrame++
    }
    else{
        this.currenFrame = 0
    }
}
  }

  update () {
    this.draw()
    this.animateFrames()
   }

  
}


class Avatar extends Scene{
	constructor({ 
        position, 
        velocity, 
        color ="red", 
        imageSrc,
        scale = 1,
        maxFrames = 1,
        offset ={
            x:0,
            y:0,
            },
    sprites,
    attackBoxx = {offset:{},width:undefined,height:undefined}
    }) { 

        super({
            position,imageSrc,scale,maxFrames,offset
        })


		this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.color = color
        this.health = 100

        this.currenFrame = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.sprites = sprites

        for(const sprite in sprites){
            this.sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
        

        this.attackBox = {
            position: {
                x:this.position.x,
                y:this.position.y
            },
            offset: attackBoxx.offset,
            width: attackBoxx.width,
            height: attackBoxx.height
        }

        this.isAttacking = false
	}

    



    update () {
        this.draw()
        this.animateFrames()

        //ATTACK BOX 
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        // c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= 480){
            this.velocity.y = 0 ; 
        }
        else{
            this.velocity.y += gravity;
        }
    }

    attack(){
        this.switchSprites("attack",this.sprites.attack)
        this.isAttacking = true;
        setTimeout(()=>{
         this.isAttacking = false;
        },1000)

    }

    switchSprites(action,sprite){
        if(this.image === this.sprites.attack.image && this.currenFrame < this.sprites.attack.maxFrames - 1){
            return
        }

       if(this.image != sprite.image){
       this.image = sprite.image;
       this.maxFrames = sprite.maxFrames;
       this.currenFrame = 0;
       }
    }
}
