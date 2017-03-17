// Enemies our player must avoid
var Enemy = function() {
    //this.x = x;
    //this.y = y;
    this.width = 83;
    this.height = 73;
    this.x = -20;
    this.y = Math.floor(Math.random() * (200)) + 50;
    this.speed = Math.floor(Math.random() * (200)) + 100;
    this.sprite = 'images/enemy-bug.png';
};

// Parameter: dt, a time delta between ticks
// Check if collide with player, if so, player return to its start position
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  if(this.x > 485){
    this.handleReset();
  }

  if(this.isCollide()){
    player.handleReset();
  }


};

//Function that detect collisions checking the borders of the player and bugs
Enemy.prototype.isCollide = function() {
    return !(
        ((this.y + this.height) < (player.y)) ||
        (this.y > (player.y + player.height)) ||
        ((this.x + player.width) < player.x) ||
        (this.x > (player.x + player.width))
    );
}
//Function defined to simulate infinit number of bugs with random positions and speeds
Enemy.prototype.handleReset = function(){
  this.x = -10;
  this.y = Math.floor(Math.random() * (200)) + 50;
}

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(x,y) {
this.x = x;
this.y = y;
this.sprite = 'images/char-boy.png';
this.width = 73;
this.height = 83;
/*The Player function, which initiates the Player by:
Loading the image by setting this.sprite to the appropriate image in the image folder (use the code from the Enemy function as an example on how to do that)
Setting the Player initial location*/
}
//Update method of player that is actually till now not needed.
Player.prototype.update = function(dt) {
  /*The update method for the Player (can be similar to the one for the Enemy)*/
};
//Render method that draws the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Method that receives the key that it was pressed and changes the position of player
Player.prototype.handleInput = function (key){
  if (key === 'left' && this.x > 0) {
       this.x = this.x - 101;
   } else if (key === 'right' && this.x < 404) {
       this.x = this.x + 101;
   } else if (key === 'up' && this.y > 70) {
       this.y = this.y - 83;
       if (this.y < 50){
         player.handleReset();
         myScore.score+= 1;
         myScore.text="Points: " + myScore.score;
         console.log(this.y);
       }
   } else if (key === 'down' && this.y < 404) {
       this.y = this.y + 83;
   }
}
//start position of the player. Called when collision between bugs and player
Player.prototype.handleReset = function(){
  this.x = 404;
  this.y = 404;
}
//Score class
var Score = function(width, height, color, x, y) {
    this.tempScore=0;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.text="Points: " + this.score;
}
//score's update methode, which till now is not needed.
Score.prototype.update = function() {
}
//score's render methode, which draws the points collected
Score.prototype.render = function () {
  ctx.font = this.width + " " + this.height;
  ctx.fillStyle = this.color;
  ctx.fillText(this.text, this.x, this.y);
}
//Enemies objects
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
//Enemy array object
var allEnemies = [enemy1, enemy2, enemy3];
//Player object
var player = new Player(404, 404);
//Score object
var myScore = new Score("30px", "Consolas", "black", 15, 574);

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
