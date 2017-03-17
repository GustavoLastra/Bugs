// Enemies our player must avoid
var Enemy = function() {
    //this.x = x;
    //this.y = y;
    this.width = 83;
    this.height = 73;
    this.x = -20;
    this.y = Math.floor(Math.random() * (200)) + 50;
    this.speed = Math.floor(Math.random() * (200)) + 100;
    this.myBottom = this.y + this.height;
    this.myTop = this.y;
    this.myLeft = this.x;
    this.myRight = this.x + this.width;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  if(this.x > 485){
    this.handleReset();
  }

  if(this.isCollide()){
    player.handleReset();
  }


};

Enemy.prototype.isCollide = function() {
    return !(
        ((this.y + this.height) < (player.y)) ||
        (this.y > (player.y + player.height)) ||
        ((this.x + player.width) < player.x) ||
        (this.x > (player.x + player.width))
    );
}

Enemy.prototype.handleReset = function(){
  this.x = -10;
  this.y = Math.floor(Math.random() * (200)) + 50;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
this.x = x;
this.y = y;
this.sprite = 'images/char-boy.png';
this.width = 73;
this.height = 83;
this.myBottom = this.y + this.height;
this.myTop = this.y;
this.myLeft = this.x;
this.myRight = this.x + this.width;
/*The Player function, which initiates the Player by:
Loading the image by setting this.sprite to the appropriate image in the image folder (use the code from the Enemy function as an example on how to do that)
Setting the Player initial location*/
}

Player.prototype.update = function(dt) {
  /*The update method for the Player (can be similar to the one for the Enemy)*/

};

Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    /*The render method for the Player (use the code from the render method for the Enemy)
    The handleInput method, which should receive user input, allowedKeys (the key which was pressed) and move the player according to that input. In particular:
    Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down.
    Recall that the player cannot move off screen (so you will need to check for that and handle appropriately).
    If the player reaches the water the game should be reset by moving the player back to the initial location (you can write a separate reset Player method to handle that).
    You can add your own Player methods as needed.*/

};

Player.prototype.handleInput = function (key){
  if (key === 'left' && this.x > 0) {
       this.x = this.x - 101;
   } else if (key === 'right' && this.x < 404) {
       this.x = this.x + 101;
   } else if (key === 'up' && this.y > 70) {
       this.y = this.y - 83;
       if (this.y < 50){
         player.handleReset();
         console.log(this.y);
       }
   } else if (key === 'down' && this.y < 404) {
       this.y = this.y + 83;
   }
}

Player.prototype.handleReset = function(){
  this.x = 404;
  this.y = 404;
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
/*var nEnemies = 4
var allEnemies = [nEnemies];
var posX = 100;
var posY = 100;
for (var i = 0; i < nEnemies; i++) {
        posY+= 100;
        allEnemies.push(new Enemy(posX, posY));
      }*/

/*var enemy1 = new Enemy(50,50);
var enemy2 = new Enemy(150,150);
var enemy3 = new Enemy(200,200);*/
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];
// Place the player object in a variable called player

var player = new Player(404, 404);
//var player = new Player(485, 0);

//canvas.width = 505;
//canvas.height = 606;
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
